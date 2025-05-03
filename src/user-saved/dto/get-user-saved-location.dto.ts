import { createZodDto } from 'nestjs-zod';
import { PaginatedQuerySchema } from 'src/general/dto/paginated-query.dto';

const GetUserSavedLocationSchema = PaginatedQuerySchema;

export class GetUserSavedLocationDto extends createZodDto(
  GetUserSavedLocationSchema,
) {}
