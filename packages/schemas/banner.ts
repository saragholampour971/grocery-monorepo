import { ApiResponseSchema } from "./globalTypes";
import { z } from "zod/v4";

//schema
export const BannerSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});
export const BannerResponseSchema = ApiResponseSchema(z.array(BannerSchema));

//type
export type BannerType = z.infer<typeof BannerSchema>;
export type BannerResponseType = z.infer<typeof BannerResponseSchema>;
