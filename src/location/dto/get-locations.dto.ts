import { createZodDto } from 'nestjs-zod';
import { PaginatedQuerySchema } from 'src/general/dto/paginated-query.dto';

const GetLocationSchema = PaginatedQuerySchema;

export class GetLocationDto extends createZodDto(GetLocationSchema) {}
