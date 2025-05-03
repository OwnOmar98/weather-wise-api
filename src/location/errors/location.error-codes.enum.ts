export const LocationErrorCodesEnum = {
  LocationAlreadyExist: 'location-001',
  LocationNotFound: 'location-002',
} as const;

export type LocationErrorCodesEnum =
  (typeof LocationErrorCodesEnum)[keyof typeof LocationErrorCodesEnum];
