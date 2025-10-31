import { ApiResponseSchema } from "./globalTypes";
import { z } from "zod/v4";

//schema
export const BannersSchema = z.array(
  z.object({
    id: z.number(),
    imageUrl: z.string(),
  }),
);

export const BannersResponseSchema = ApiResponseSchema(BannersSchema);

//type
export type BannersType = z.infer<typeof BannersSchema>;
export type BannersResponseType = z.infer<typeof BannersResponseSchema>;
