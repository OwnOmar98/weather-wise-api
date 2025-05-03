import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LocationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

export class LocationDto extends createZodDto(LocationSchema) {}
