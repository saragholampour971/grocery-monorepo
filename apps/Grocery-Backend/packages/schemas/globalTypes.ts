import { z } from 'zod/v4';

export interface ErrorResponse {
  error?: string;
  status?: number;
}

export type ApiResponse<T> = { data?: T } & ErrorResponse

const ErrorResponseSchema = z.object({
  error: z.string(),
  status: z.number(),
});


export const ApiResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.union([
    z.object({ data: schema }), // موفقیت: data required
    ErrorResponseSchema,       // خطا: error required
  ]);
export type ZErrorResponse = z.infer<typeof ErrorResponseSchema>;
