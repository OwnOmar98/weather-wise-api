import { Module } from '@nestjs/common';
import { LocationModule } from 'src/location/location.module';
import { WeatherApiService } from './services/weather-api.service';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherApiService],
  imports: [LocationModule],
})
export class WeatherModule {}
