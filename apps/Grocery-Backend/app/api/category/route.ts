import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { Category, CategoryResponse } from '@grocery-repo/schemas';

export async function GET(): Promise<NextResponse<CategoryResponse>> {
  try {
    const snapshot = await adminDb.collection('categories').get();
    const category: Category[] = snapshot.docs.map((doc) => ({
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
