import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { ExclusiveOffersResponse } from '@/packages/schemas/exclusive-offers';
import { IProduct } from '@/packages/schemas/products';

export async function GET(): Promise<NextResponse<ExclusiveOffersResponse>> {
  try {
    const snapshot = await adminDb.collection('products').get();
    const posts: IProduct[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      imageUrl: doc.data().imageUrl,
      title: doc.data().title,
      price: doc.data().price,
      description: doc.data().description,
      categoryName: doc.data().category,
    }));
    return NextResponse.json({ data: posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts', status: 500 },
    );
  }
}
