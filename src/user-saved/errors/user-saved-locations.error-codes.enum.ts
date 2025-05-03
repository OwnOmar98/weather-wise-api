export const UserSavedLocationErrorCodesEnum = {
  UserSavedLocationAlreadyExist: 'user-saved-location-001',
  UserSavedLocationNotFound: 'user-saved-location-002',
  LocationNotFound: 'user-saved-location-003',
} as const;

export type UserSavedLocationErrorCodesEnum =
  (typeof UserSavedLocationErrorCodesEnum)[keyof typeof UserSavedLocationErrorCodesEnum];
