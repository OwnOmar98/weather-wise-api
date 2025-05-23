import { Condition, UsEpaIndex, WindDirection } from './general';

export interface CurrentElement {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: WindDirection;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: AirQualityElement;
}
export interface AirQualityElement {
  co: number;
  o3: number;
  no2: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': UsEpaIndex;
  'gb-defra-index': number;
}
