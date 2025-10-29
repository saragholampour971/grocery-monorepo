import { z } from "zod/v4";
import { ApiResponseSchema } from "./globalTypes";

export const ProductSchema = z.object({
  id: z.string(),
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  title: z.string(),
  imageUrl: z.string(),
  price: z.number(),
  description: z.string(),
});

export const ProductsPathParam = z.object({
  categoryId: z.string().meta({
    description: "Unique Category ID",
    example: "uuid",
  }),
});

export const ProductsResponseSchema = ApiResponseSchema(z.array(ProductSchema));

// types
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductsParams = z.infer<typeof ProductsPathParam>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
