import { NextResponse } from 'next/server';
import { createDocument } from 'zod-openapi';
import {
  AddCartParamsSchema,
  BannerResponseSchema,
  CartResponseSchema,
  CategoryResponseSchema,
  ExclusiveOffersResponseSchema,
  LoginResponseSchema,
  MeSchema,
  ProductsPathParam,
  ProductsResponseSchema,
} from '@grocery-repo/schemas';


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
                schema: LoginResponseSchema,
              },
            },
          },
        },
      },
    },
    '/api/logout': {
      post: {
        responses: {
          '200': {
            description: 'logged out successfully',
          },
        },
      },
    },
    '/api/me': {
      get: {
        responses: {
          '200': {
            description: 'get logged in user ',
            content: {
              'application/json': {
                schema: MeSchema,
              },
            },
          },
        },
      },
    },
    '/api/banner': {
      get: {
        responses: {
          '200': {
            description: 'get banner image',
            content: {
              'application/json': {
                schema: BannerResponseSchema,
              },
            },
          },
        },
      },
    },
    '/api/cart': {
      get: {
        responses: {
          '200': {
            description: 'get cart successfully',
            content: {
              'application/json': {
                schema: CartResponseSchema,
              },
            },
          },
        },
      },
      post: {
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: AddCartParamsSchema,
            },
          },
        },
        responses: {
          '200': {
            description: ' successfully added to cart',
          },
        },
      },
    },
    'api/category': {
      get: {
        responses: {
          '200': {
            description: 'get category successfully',
            content: {
              'application/json': {
                schema: CategoryResponseSchema,
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
