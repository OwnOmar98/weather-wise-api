import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { ForecastDto } from './dto/forecast.dto';
import { SearchDto } from './dto/search.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseGuards(JwtAuthenticationGuard)
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
