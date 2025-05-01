import { MoonPhases } from './general';

export interface AstroElement {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: MoonPhases;
  moon_illumination: string;
  is_moon_up: number;
  is_sun_up: number;
}
