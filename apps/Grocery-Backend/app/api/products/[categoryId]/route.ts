import { adminDb } from '@/lib/firebaseAdmin';
import { ProductsParams, ProductsPathParam, ProductsResponse, ProductType } from '@grocery-repo/schemas';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod/v4';

export async function GET(
  req: Request,
  context: { params: Promise<ProductsParams> },
): Promise<NextResponse<ProductsResponse>> {
  try {
    const params = await context.params;
    // Throws ZodError if invalid (e.g., no categoryId)
    ProductsPathParam.parse(params);
    const { categoryId } = params;
    const productsSnapshot = await adminDb
      .collection('products')
      .where('categoryId', '==', categoryId)
      .get();

    const products: ProductType[] = await Promise.all(
      productsSnapshot.docs.map(async (doc) => {
        const data = doc.data();

        // گرفتن category name
        const categoryDoc = await adminDb
          .collection('categories')
          .doc(data.categoryId)
          .get();

        const categoryName = categoryDoc.exists
          ? categoryDoc.data()?.title
          : null;

        return {
          id: doc.id,
          imageUrl: data.imageUrl,
          title: data.title,
          price: data.price,
          categoryId: data.categoryId,
          categoryName, // اضافه شده
          description: data.description,
        };
      }),
    );

    return NextResponse.json({ data: products });
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle validation errors (e.g., invalid categoryId)
      return NextResponse.json(
        { error: 'Invalid category ID provided', status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch products', status: 500 },
    );
  }
}
