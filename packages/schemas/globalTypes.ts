import { z } from "zod/v4";

//schema
const FailResponseSchema = z.object({
  error: z.string().optional(),
  status: z.number().optional(),
});

export const SuccessResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: schema,
  });

export const ApiResponseSchema = <T extends z.ZodType>(schema: T) =>
  SuccessResponseSchema(schema).or(FailResponseSchema);

export const VoidSchema = z.void();

//type
export type SuccessResponseType<T extends z.ZodType<any>> = z.infer<
  ReturnType<typeof SuccessResponseSchema<T>>
>;

export type ApiResponse<T extends z.ZodType<any>> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;

export type VoidResponse = ApiResponse<typeof VoidSchema>;
