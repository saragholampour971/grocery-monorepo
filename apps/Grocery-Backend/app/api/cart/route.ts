import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/serverAuth';
import { adminDb } from '@/lib/firebaseAdmin';
import { ApiResponse, CartItemType, CartResponse, VoidResponse } from '@grocery-repo/schemas';
import { FieldPath } from 'firebase-admin/firestore';

export async function GET(): Promise<NextResponse<CartResponse>> {
  // گرفتن کاربر جاری
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 });
  }

  const userRef = adminDb.collection('users').doc(user.uid);
  const userSnapshot = await userRef.get();

  // اگر کاربر وجود نداشت، بساز
  if (!userSnapshot.exists) {
    await userRef.set({
      cart: [], // یا هر فیلد اولیه که میخوای
    });
  }

  // گرفتن cart
  const cartSnapshot = await userRef.collection('cart').get();

  if (cartSnapshot.empty) return NextResponse.json({ data: [] });

  const productIds = cartSnapshot.docs.map((doc) => doc.id);

  // batch fetch محصولات
  const productsSnap = await adminDb
    .collection('products')
    .where(FieldPath.documentId(), 'in', productIds)
    .get();

  const productsMap = new Map(
    productsSnap.docs.map((doc) => [doc.id, doc.data()]),
  );

  const cart: CartItemType[] = cartSnapshot.docs.map((doc) => {
    const productData = productsMap.get(doc.id) || {};
    return {
      productId: doc.id,
      quantity: +doc.data().quantity,
      name: productData.name,
      price: +productData.price,
      imageUrl: productData.imageUrl,
      id: doc.id,
      categoryId: productData.categoryId,
      categoryName: productData.categoryName,
      title: productData.title,
      description: productData.description,
    };
  });

  return NextResponse.json({ data: cart });
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<void>>> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  const productInCartRef = adminDb
    .collection('users')
    .doc(user.uid)
    .collection('cart')
    .doc(productId);

  const productRef = await productInCartRef.get();
  if (productRef.exists && quantity == 0) {
    await productInCartRef.delete();
  } else if (productRef.exists) {
    await productInCartRef.update({
      quantity: quantity || 0,
    });
  } else {
    await productInCartRef.set({
      productId,
      quantity,
    });
  }
  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: Request): VoidResponse {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 });
  }
  const { productId } = await req.json();
  await adminDb
    .collection('users')
    .doc(user.uid)
    .collection('cart')
    .doc(productId)
    .delete();

  return NextResponse.json({ status: 200 });
}
