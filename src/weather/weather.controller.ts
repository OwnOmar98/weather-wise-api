import { Controller, Get, Query } from '@nestjs/common';
import { ForecastDto } from './dto/forecast.dto';
import { SearchDto } from './dto/search.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('forecast')
  getWeatherForecast(@Query() query: ForecastDto) {
    return this.weatherService.getWeatherForecast(query);
  }

  @Get('search')
  searchCity(@Query() query: SearchDto) {
    return this.weatherService.searchCity(query);
  }
}
