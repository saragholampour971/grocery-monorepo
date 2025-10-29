import { z } from "zod/v4";
import { ApiResponseSchema } from "./globalTypes";

//schema
export const CategorySchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  title: z.string(),
});
export const CategoryResponseSchema = ApiResponseSchema(
  z.array(CategorySchema),
);

//type
export type Category = z.infer<typeof CategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
