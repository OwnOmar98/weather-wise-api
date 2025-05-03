import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthModule } from './authentication/auth.module';
import { LocationModule } from './location/location.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeatherModule } from './weather/weather.module';
import { UserSavedModule } from './user-saved/user-saved.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    AuthModule,
    PrismaModule,
    LocationModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    UserSavedModule,
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
