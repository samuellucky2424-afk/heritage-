import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { products as seedProducts } from '@/data/products';
import type { Product } from '@/types';

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  seedProductsIfEmpty: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STATIC_CATEGORIES = ['All', 'Pipes', 'Valves', 'Drilling Tools', 'Safety Equipment', 'Pumps', 'Fittings', 'Cables', 'Spare Parts'];

function docToProduct(docSnap: { id: string; data: () => Record<string, unknown> }): Product {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: (data.name as string) || '',
    category: (data.category as string) || '',
    price: (data.price as number) || 0,
    partNumber: (data.partNumber as string) || '',
    stock: (data.stock as number) || 0,
    image: (data.image as string) || '',
    description: (data.description as string) || '',
    specs: (data.specs as Record<string, string>) || {},
  };
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'products'), orderBy('name'));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => docToProduct({ id: d.id, data: d.data.bind(d) }));
      setProducts(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>): Promise<Product> => {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newProduct: Product = { ...product, id: docRef.id };
    setProducts((prev) => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
    return newProduct;
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const seedProductsIfEmpty = useCallback(async () => {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) {
      for (const product of seedProducts) {
        await addDoc(collection(db, 'products'), {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      await refreshProducts();
    }
  }, [refreshProducts]);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const dynamicCategories = Array.from(new Set(['All', ...products.map((p) => p.category)])).filter(Boolean);
  const categories = dynamicCategories.length > 1 ? dynamicCategories : STATIC_CATEGORIES;

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        seedProductsIfEmpty,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}
