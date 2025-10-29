import { IProduct } from './products'
import { ApiResponse } from './globalTypes'

export interface IPostParams {
  productId: string
  quantity: number
}

export type ICartItem = IProduct & IPostParams
export type CartResponse = ApiResponse<ICartItem[]>
