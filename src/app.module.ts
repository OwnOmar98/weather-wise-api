import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
