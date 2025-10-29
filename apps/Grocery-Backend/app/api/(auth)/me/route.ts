import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/serverAuth'
import { MeResponse } from '../../../../packages/schemas/auth'

export async function GET(): Promise<NextResponse<MeResponse>> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ status: 200, data: { email: null, uid: null } })
  }
  return NextResponse.json({ data: user })
}
