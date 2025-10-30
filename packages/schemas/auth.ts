import { ApiResponseSchema } from "./globalTypes";
import { z } from "zod/v4";

//schema
export const loginSchema = z.object({
  email: z.string().nullable(),
  uid: z.string().nullable()
});
export const LoginResponseSchema = ApiResponseSchema(loginSchema);
export const MeSchema = LoginResponseSchema;

//type
export type MeResponse = z.infer<typeof LoginResponseSchema>;
export type Me = z.infer<typeof loginSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
