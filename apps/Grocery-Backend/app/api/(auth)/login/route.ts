import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';
import { LoginResponseType } from '@grocery-repo/schemas';

export async function POST(req: Request): Promise<NextResponse<LoginResponseType>> {

  try {
    const token = req.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ success: false, error: 'user not found', status: 401 });
    }
    const decodedToken = await adminAuth.verifyIdToken(token);

    const res = NextResponse.json({
      data: {
        uid: decodedToken.uid || null,
        email: decodedToken.email || null,
      },
    });
    res.cookies.set('token', token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      // path: '/',
      httpOnly: true,          // JS cannot access
      // sameSite: "None",        // allow cross-site cookie
      // domain: 'frontend.com',  // optional, set for cross-domain
      maxAge: 1000 * 60 * 60,  // 1 hour
    });

    return res;

  } catch (e) {
    console.error(e, ' catch e from post');
    return NextResponse.json({ success: false, error: 'user not found', status: 401 });
  }

}
