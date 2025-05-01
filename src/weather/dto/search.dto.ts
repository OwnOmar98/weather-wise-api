import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SearchSchema = z.object({
  location: z.string(),
});

export class SearchDto extends createZodDto(SearchSchema) {}
