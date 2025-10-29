import { ApiResponse } from './globalTypes'

export type Banner = {
  id: number
  imageUrl: string
}

export type BannerResponse = ApiResponse<Banner[]>
