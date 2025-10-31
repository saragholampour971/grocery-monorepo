import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { CategoriesResponseType, CategoriesType } from '@grocery-repo/schemas';

export async function GET(): Promise<NextResponse<CategoriesResponseType>> {
  try {
    const snapshot = await adminDb.collection('categories').get();
    const category: CategoriesType = snapshot.docs.map((doc) => ({
      id: doc.id,
      imageUrl: doc.data().imageUrl,
      title: doc.data().title,
    }));
    return NextResponse.json({ data: category });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories', status: 500 },
    );
  }
}
