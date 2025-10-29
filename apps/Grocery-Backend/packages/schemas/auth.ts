import {ApiResponse, ApiResponseSchema} from './globalTypes';
import {z} from 'zod/v4';


export type MeResponse = ApiResponse<any>

export const loginSchema = z.object({
  email: z.string().nullable(),
  uid: z.string().nullable(),

});
export const loginResponseSchema = ApiResponseSchema(loginSchema);


//type
export type loginResponseType = z.infer<typeof loginResponseSchema>
