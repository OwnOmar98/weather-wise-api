export interface Condition {
  text: string;
  icon: string;
  code: number;
}

const WindDirection = {
  North: 'N',
  NorthNorthEast: 'NNE',
  NorthEast: 'NE',
  EastNorthEast: 'ENE',
  East: 'E',
  EastSouthEast: 'ESE',
  SouthEast: 'SE',
  SouthSouthEast: 'SSE',
  South: 'S',
  SouthSouthWest: 'SSW',
  SouthWest: 'SW',
  WestSouthWest: 'WSW',
  West: 'W',
  WestNorthWest: 'WNW',
  NorthWest: 'NW',
  NorthNorthWest: 'NNW',
} as const;
export type WindDirection = (typeof WindDirection)[keyof typeof WindDirection];

const MoonPhases = {
  NewMoon: 'New Moon',
  WaxingCrescent: 'Waxing Crescent',
  FirstQuarter: 'First Quarter',
  WaxingGibbous: 'Waxing Gibbous',
  FullMoon: 'Full Moon',
  WaningGibbous: 'Waning Gibbous',
  LastQuarter: 'Last Quarter',
  WaningCrescent: 'Waning Crescent',
} as const;
export type MoonPhases = (typeof MoonPhases)[keyof typeof MoonPhases];

const UsEpaIndex = {
  Good: 1,
  Moderate: 2,
  UnhealthyForSensitiveGroup: 3,
  Unhealthy: 4,
  VeryUnhealthy: 5,
  Hazardous: 6,
};
export type UsEpaIndex = (typeof UsEpaIndex)[keyof typeof UsEpaIndex];
