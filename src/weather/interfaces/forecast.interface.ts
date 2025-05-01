import { CurrentElement } from './current.interface';
import { ForecastDayElement } from './forecast-day.interface';
import { LocationElement } from './location.interface';

export interface ForecastResponse {
  location: LocationElement;
  current: CurrentElement;
  forecast: {
    forecastday: ForecastDayElement[];
  };
}
