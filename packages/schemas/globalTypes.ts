import { z } from "zod/v4";
import { NextResponse } from "next/server";

export interface ErrorResponse {
  error?: string;
  status?: number;
}

export type ApiResponse<T> = { data?: T } & ErrorResponse;

const ErrorResponseSchema = z.object({
  error: z.string().optional(),
  status: z.number().optional(),
});

export const ApiResponseSchema = <T extends z.ZodType>(schema: T) =>
  z
    .object({
      data: schema.optional(),
    })
    .merge(ErrorResponseSchema)
    // MUST have EITHER data OR error
    .refine((val) => (val.data !== undefined) !== (val.error !== undefined), {
      message:
        'Response must contain EITHER "data" OR "error" fields, but not both.',
    });

export type ZErrorResponse = z.infer<typeof ErrorResponseSchema>;

export type VoidResponse = Promise<NextResponse<ApiResponse<void>>>;
