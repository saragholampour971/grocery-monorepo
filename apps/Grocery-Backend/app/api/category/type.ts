import { ApiResponse } from '@grocery-repo/schemas';

export type Category = {
  id: string
  imageUrl: string
  title: string
}

export type CategoryResponse = ApiResponse<Category[]>
