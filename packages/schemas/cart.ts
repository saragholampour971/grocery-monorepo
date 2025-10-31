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
export const CartSchema = z.array(CartItemSchema);
export const CartResponseSchema = ApiResponseSchema(CartSchema);

//type
export type AddCartParamsType = z.infer<typeof AddCartParamsSchema>;
export type CartItemType = z.infer<typeof CartItemSchema>;
export type CartResponseType = z.infer<typeof CartResponseSchema>;
