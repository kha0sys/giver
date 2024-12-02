import { 
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Cause, Product } from '../types';

// Causas
export const createCause = async (causeData: Omit<Cause, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const causesRef = collection(db, 'causes');
    const now = new Date().toISOString();
    
    const docRef = await addDoc(causesRef, {
      ...causeData,
      currentAmount: 0,
      supporters: [],
      status: 'active',
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating cause:', error);
    throw error;
  }
};

export const getCause = async (causeId: string) => {
  try {
    const causeRef = doc(db, 'causes', causeId);
    const causeSnap = await getDoc(causeRef);
    
    if (!causeSnap.exists()) {
      throw new Error('Causa no encontrada');
    }

    return { id: causeSnap.id, ...causeSnap.data() } as Cause;
  } catch (error) {
    console.error('Error getting cause:', error);
    throw error;
  }
};

export const getActiveCauses = async (limit = 10) => {
  try {
    const q = query(
      collection(db, 'causes'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Cause);
  } catch (error) {
    console.error('Error getting active causes:', error);
    throw error;
  }
};

export const supportCause = async (causeId: string, userId: string, amount: number) => {
  try {
    const causeRef = doc(db, 'causes', causeId);
    const causeSnap = await getDoc(causeRef);
    
    if (!causeSnap.exists()) {
      throw new Error('Causa no encontrada');
    }

    const causeData = causeSnap.data();
    const newAmount = (causeData.currentAmount || 0) + amount;
    const supporters = causeData.supporters || [];

    await updateDoc(causeRef, {
      currentAmount: newAmount,
      supporters: [...new Set([...supporters, userId])],
      updatedAt: new Date().toISOString(),
      status: newAmount >= causeData.goal ? 'completed' : 'active',
    });
  } catch (error) {
    console.error('Error supporting cause:', error);
    throw error;
  }
};

// Productos
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const productsRef = collection(db, 'products');
    const now = new Date().toISOString();
    
    const docRef = await addDoc(productsRef, {
      ...productData,
      status: 'available',
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error('Producto no encontrado');
    }

    return { id: productSnap.id, ...productSnap.data() } as Product;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const getAvailableProducts = async (limit = 10) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product);
  } catch (error) {
    console.error('Error getting available products:', error);
    throw error;
  }
};

export const updateProductStatus = async (productId: string, status: Product['status']) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    throw error;
  }
};
