import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { BannerResponseType, BannerType } from '@grocery-repo/schemas';

export async function GET(): Promise<NextResponse<BannerResponseType>> {
  try {
    const snapshot = await adminDb.collection('banner').get();
    const banners: BannerType[] = snapshot.docs.map((doc) => ({
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
