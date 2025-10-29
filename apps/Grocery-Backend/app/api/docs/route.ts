import { NextResponse } from 'next/server';
import { createDocument } from 'zod-openapi';
import { ProductsPathParam, ProductsResponseSchema } from '@/packages/schemas/products';
import { ExclusiveOffersResponseSchema } from '@/packages/schemas/exclusive-offers';
import { loginResponseSchema } from '@grocery-repo/schemas';


// تولید مستندات OpenAPI
const document = createDocument({
  openapi: '3.0.0',
  info: {
    title: 'Backend API',
    version: '1.0.0',
  },
  paths: {
    '/api/products/{categoryId}': {
      get: {
        requestParams: {
          path: ProductsPathParam,
        },
        responses: {
          '200': {
            description: 'Product retrieved successfully',
            content: {
              'application/json': {
                schema: ProductsResponseSchema,
              },
            },
          },
        },
      },
    },
    '/api/exclusive-offers': {
      get: {
        responses: {
          '200': {
            description: 'get exclusive offers successfully',
            content: {
              'application/json': {
                schema: ExclusiveOffersResponseSchema,
              },
            },
          },
        },
      },
    },
    '/api/login': {
      post: {
        responses: {
          '200': {
            description: 'logged in successfully',
            content: {
              'application/json': {
                schema: loginResponseSchema,
              },
            },
          },
        },
      },
    },
  },
});

export function GET() {
  return NextResponse.json(document);
}
