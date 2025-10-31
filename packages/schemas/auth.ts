import { ApiResponseSchema } from "./globalTypes";
import { z } from "zod/v4";

//schema
export const LoginSchema = z.object({
  email: z.string().nullable(),
  uid: z.string().nullable(),
});
export const MeSchema = LoginSchema;
export const LoginResponseSchema = ApiResponseSchema(LoginSchema);

//type
export type Me = z.infer<typeof LoginSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
