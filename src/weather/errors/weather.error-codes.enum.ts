export const WeatherErrorCodesEnum = {
  ApiKeyNotProvided: 'weather-001',
  MissingQueryParameter: 'weather-002',
  InvalidRequestUrl: 'weather-003',
  LocationNotFound: 'weather-004',
  InvalidApiKey: 'weather-005',
  MonthlyQuotaExceeded: 'weather-006',
  ApiKeyDisabled: 'weather-007',
  AccessDeniedForResource: 'weather-008',
  InvalidBulkRequestJson: 'weather-009',
  TooManyLocationsInBulkRequest: 'weather-010',
  InternalApplicationError: 'weather-011',
} as const;

export type WeatherErrorCodesEnum =
  (typeof WeatherErrorCodesEnum)[keyof typeof WeatherErrorCodesEnum];
