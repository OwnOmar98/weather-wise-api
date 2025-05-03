import { z } from 'zod';

export const PaginatedQuerySchema = z.object({
  skip: z.coerce.number().min(0).default(0),
  take: z.coerce.number().min(0).default(10),
});
