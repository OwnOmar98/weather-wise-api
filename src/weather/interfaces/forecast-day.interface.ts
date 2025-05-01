import { AstroElement } from './astro.interface';
import { DayElement } from './day.interface';
import { HourElement } from './hour.interface';

export interface ForecastDayElement {
  date: string;
  date_epoch: number;
  day: DayElement;
  astro: AstroElement;
  hour: HourElement[];
}
