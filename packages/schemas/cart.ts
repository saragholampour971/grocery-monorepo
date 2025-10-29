import { ProductSchema } from "./products";
import { ApiResponseSchema } from "./globalTypes";
import { z } from "zod/v4";

//schema
export const AddCartParamsSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
export const CartItemSchema = z.object({
  ...AddCartParamsSchema.shape,
  ...ProductSchema.shape,
});
export const CartResponseSchema = ApiResponseSchema(z.array(CartItemSchema));

//type
export type AddCartParamsType = z.infer<typeof AddCartParamsSchema>;
export type CartItemType = z.infer<typeof CartItemSchema>;
export type CartResponse = z.infer<typeof CartResponseSchema>;
