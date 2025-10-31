import { z } from "zod/v4";
import { ApiResponseSchema } from "./globalTypes";

//schema
export const CategorySchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  title: z.string(),
});
export const CategoriesSchema = z.array(CategorySchema);
export const CategoriesResponseSchema = ApiResponseSchema(CategoriesSchema);

//type
export type CategoriesType = z.infer<typeof CategoriesSchema>;
export type CategoriesResponseType = z.infer<typeof CategoriesResponseSchema>;
