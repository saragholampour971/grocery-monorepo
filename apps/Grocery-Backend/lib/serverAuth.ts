import { cookies } from 'next/headers'
import { adminAuth } from './firebaseAdmin'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) return null

    const decodedToken = await adminAuth.verifyIdToken(token)

    return {
      uid: decodedToken.user_id as string,
      email: decodedToken.email as string,
    }
  } catch (err) {
    console.error('JWT verify error:', err)
    return null
  }
})
