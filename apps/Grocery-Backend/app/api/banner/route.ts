import { adminDb } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { Banner, BannerResponse } from '@/packages/schemas/banner';

export async function GET(): Promise<NextResponse<BannerResponse>> {
  try {
    const snapshot = await adminDb.collection('banner').get();
    const banners: Banner[] = snapshot.docs.map((doc) => ({
      id: +doc.id,
      imageUrl: doc.data().imageUrl,
    }));
    return NextResponse.json({ data: banners });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch banner' },
      { status: 500 },
    );
  }
}
