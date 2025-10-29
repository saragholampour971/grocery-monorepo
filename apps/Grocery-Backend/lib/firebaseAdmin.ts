import admin from 'firebase-admin'
import { HttpsProxyAgent } from 'https-proxy-agent'

const PROXY_URL = 'http://127.0.0.1:10809'
const agent = new HttpsProxyAgent(PROXY_URL)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://supermarket-e52be.firebaseio.com',
    httpAgent: agent,
  })
}

const adminDb = admin.firestore()
const adminAuth = admin.auth()
export { adminDb, admin, adminAuth }

async function test() {
  'use server'
  try {
    const docRef = adminDb.collection('test').doc('check')
    await docRef.set({ hello: 'gov-world' })
    const snap = await docRef.get()
    console.log('gov-Data:', snap.data())
  } catch (err: any) {
    console.error('gov-Error:', err.code, err.message)
  }
}

test()
