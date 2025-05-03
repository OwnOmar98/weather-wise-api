import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
