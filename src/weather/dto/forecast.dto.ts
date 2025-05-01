import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { formatDate } from '../helper/data-formatter.helper';
const validateDate = (date: Date | undefined) => {
  if (!date) return true;
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const maxDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  const inputDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  return inputDate >= today && inputDate <= maxDate;
};
export const ForecastSchema = z
  .object({
    location: z.string(),
    days: z.coerce.number().int().gte(1).lte(14).optional(),
    date: z.coerce
      .date()
      .optional()
      .refine(validateDate, {
        message: 'date must be a date between today and the next 14 days',
      })
      .transform((date) => (date ? formatDate(date) : undefined)),
  })
  .refine(({ date, days }) => !(date && days), {
    message: 'date and days cannot be used together',
  });
export class ForecastDto extends createZodDto(ForecastSchema) {}
