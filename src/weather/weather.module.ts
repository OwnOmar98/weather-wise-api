import { Module } from '@nestjs/common';
import { WeatherApiService } from './services/weather-api.service';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherApiService],
})
export class WeatherModule {}
