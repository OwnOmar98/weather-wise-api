import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ForecastDto } from './dto/forecast.dto';
import { SearchDto } from './dto/search.dto';
import { ForecastResponse } from './interfaces/forecast.interface';
import { Condition, WindDirection } from './interfaces/general';
import { SearchResponse } from './interfaces/search.interface';
import { WeatherApiService } from './services/weather-api.service';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly weatherApiService: WeatherApiService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow('WEATHER_API_KEY');
    this.apiUrl = this.configService.getOrThrow('WEATHER_API_URL');
  }

  async getWeatherForecast({ location, days, date }: ForecastDto) {
    const data = await this.weatherApiService.get<ForecastResponse>({
      endpoint: 'forecast.json',
      queryParams: {
        q: location,
        days,
        dt: date,
      },
    });
    const forecastDay = data.forecast.forecastday[0];
    const hoursForecast = forecastDay.hour.map((el) => ({
      time: el.time,
      condition: el.condition,
      temp: el.temp_c,
      windSpeed: el.wind_kph,
      windDir: el.wind_dir,
    }));
    const centerIndex = Math.min(
      Math.round(new Date(data.location.localtime).getHours() / 3) * 3,
      23,
    );
    const response = {
      location: data.location,
      forecast: data.forecast.forecastday.map(({ date, day }) => ({
        date,
        avgTemp: day.avgtemp_c,
        condition: day.condition,
      })),
      hourlyForecast: this.getForecastElements(hoursForecast, centerIndex),
      current: {
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        temp: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        condition: data.current.condition,
        humanity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        pressure: data.current.pressure_mb,
        uv: data.current.uv,
      },
    };
    return response;
  }

  async searchCity({ location }: SearchDto) {
    const data = await this.weatherApiService.get<SearchResponse[]>({
      endpoint: 'search.json',
      queryParams: {
        q: location,
      },
    });
    return data;
  }

  private getForecastElements(
    hoursForecast: {
      time: string;
      condition: Condition;
      temp: number;
      windSpeed: number;
      windDir: WindDirection;
    }[],
    centerIndex: number,
  ) {
    const result = [hoursForecast[centerIndex]];
    let step = 3;

    while (result.length < 5) {
      const before = centerIndex - step;
      const after = centerIndex + step;

      if (before >= 0) result.unshift(hoursForecast[before]);
      if (result.length < 5 && after < hoursForecast.length)
        result.push(hoursForecast[after]);

      if (before < 0 && after >= hoursForecast.length) break;
      step += 3;
    }
    return result;
  }
}
