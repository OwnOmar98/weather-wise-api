import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { WeatherErrorCodesEnum } from '../errors/weather.error-codes.enum';

@Injectable()
export class WeatherApiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow('WEATHER_API_KEY');
    this.apiUrl = this.configService.getOrThrow('WEATHER_API_URL');
  }

  async get<T>({
    endpoint,
    queryParams,
  }: {
    endpoint: string;
    queryParams: Record<string, string | number | undefined>;
  }): Promise<T> {
    try {
      const url = `${this.apiUrl}/${endpoint}`;
      const { data } = await axios<T>({
        method: 'GET',
        url,
        params: {
          key: this.apiKey,
          ...queryParams,
        },
      });
      return data;
    } catch (error) {
      const e = error as AxiosError<{
        error: {
          code: number;
        };
      }>;
      switch (e.response?.data?.error?.code) {
        case 1002:
          throw new UnauthorizedException({
            errorCode: WeatherErrorCodesEnum.ApiKeyNotProvided,
            message: 'API key not provided.',
          });

        case 1003:
          throw new BadRequestException({
            errorCode: WeatherErrorCodesEnum.MissingQueryParameter,
            message: "Parameter 'q' not provided.",
          });

        case 1005:
          throw new BadRequestException({
            errorCode: WeatherErrorCodesEnum.InvalidRequestUrl,
            message: 'API request URL is invalid.',
          });

        case 1006:
          throw new BadRequestException({
            errorCode: WeatherErrorCodesEnum.LocationNotFound,
            message: "No location found matching parameter 'q'.",
          });

        case 2006:
          throw new UnauthorizedException({
            errorCode: WeatherErrorCodesEnum.InvalidApiKey,
            message: 'API key provided is invalid.',
          });

        case 2007:
          throw new ForbiddenException({
            errorCode: WeatherErrorCodesEnum.MonthlyQuotaExceeded,
            message: 'API key has exceeded calls per month quota.',
          });

        case 2008:
          throw new ForbiddenException({
            errorCode: WeatherErrorCodesEnum.ApiKeyDisabled,
            message: 'API key has been disabled.',
          });

        case 2009:
          throw new ForbiddenException({
            errorCode: WeatherErrorCodesEnum.AccessDeniedForResource,
            message:
              'API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan.',
          });

        case 9000:
          throw new BadRequestException({
            errorCode: WeatherErrorCodesEnum.InvalidBulkRequestJson,
            message:
              'JSON body passed in bulk request is invalid. Please make sure it is valid JSON with UTF-8 encoding.',
          });

        case 9001:
          throw new BadRequestException({
            errorCode: WeatherErrorCodesEnum.TooManyLocationsInBulkRequest,
            message:
              'JSON body contains too many locations for bulk request. Please keep it below 50 in a single request.',
          });

        default:
          throw new InternalServerErrorException({
            errorCode: WeatherErrorCodesEnum.InternalApplicationError,
            message: 'Internal application error.',
          });
      }
    }
  }
}
