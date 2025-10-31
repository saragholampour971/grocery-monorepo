import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { BannersResponseType, BannersType } from '@grocery-repo/schemas';

export async function GET(): Promise<NextResponse<BannersResponseType>> {
  try {
    const snapshot = await adminDb.collection('banner').get();
    const banners: BannersType = snapshot.docs.map((doc) => ({
      id: +doc.id,
      imageUrl: doc.data().imageUrl,
    }));
    return NextResponse.json({ data: banners });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch banner', status: 500 },
    );
  }
}
