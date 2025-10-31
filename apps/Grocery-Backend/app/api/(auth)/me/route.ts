import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/serverAuth';
import { LoginResponseType } from '@grocery-repo/schemas';

export async function GET(): Promise<NextResponse<LoginResponseType>> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ status: 200, data: { email: null, uid: null } });
  }
  return NextResponse.json({ data: user });
}
