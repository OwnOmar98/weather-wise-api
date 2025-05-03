import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserSavedLocationSchema = z.object({
  locationId: z.coerce.number().int().min(1),
});

export class UserSavedLocationDto extends createZodDto(
  UserSavedLocationSchema,
) {}
