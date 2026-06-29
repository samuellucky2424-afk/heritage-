import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order, CartItem, OrderStatus } from '@/types';

interface CreateOrderInput {
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerId?: string | null;
  shippingAddress: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  destination: string;
  deliveryNotes?: string;
  createdBy?: string | null;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refreshOrders: () => Promise<void>;
  createOrder: (input: CreateOrderInput) => Promise<Order>;
  getOrderByTracking: (trackingNumber: string) => Promise<Order | null>;
  getOrdersByCustomerEmail: (email: string) => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateTrackingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HIS-TRK-${timestamp}-${random}`;
}

function formatDateTime(date = new Date()): string {
  return date.toISOString().replace('T', ' ').slice(0, 16);
}

function formatDate(date = new Date()): string {
  return date.toISOString().split('T')[0];
}

const STATUS_NOTES: Record<OrderStatus, string> = {
  'Pending': 'Order received and awaiting processing',
  'Processing': 'Payment confirmed, preparing order',
  'Packed': 'Items packed and labeled',
  'Shipped': 'Picked up by freight carrier',
  'In Transit': 'En route to destination',
  'Delivered': 'Delivered to customer',
};

function docToOrder(docSnap: { id: string; data: () => Record<string, unknown> }): Order {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    trackingNumber: (data.trackingNumber as string) || '',
    date: (data.date as string) || '',
    status: (data.status as OrderStatus) || 'Pending',
    items: (data.items as CartItem[]) || [],
    total: (data.total as number) || 0,
    customerName: (data.customerName as string) || '',
    customerEmail: (data.customerEmail as string) || '',
    customerId: (data.customerId as string | null) || null,
    shippingAddress: (data.shippingAddress as string) || '',
    senderName: (data.senderName as string) || '',
    senderAddress: (data.senderAddress as string) || '',
    senderPhone: (data.senderPhone as string) || '',
    destination: (data.destination as string) || '',
    deliveryNotes: (data.deliveryNotes as string) || '',
    timeline: (data.timeline as Order['timeline']) || [],
    createdBy: (data.createdBy as string | null) || null,
  };
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => docToOrder({ id: d.id, data: d.data.bind(d) }));
      setOrders(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const createOrder = useCallback(async (input: CreateOrderInput): Promise<Order> => {
    const total = input.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const trackingNumber = generateTrackingNumber();
    const now = new Date();

    const newOrder: Order = {
      id: '',
      trackingNumber,
      date: formatDate(now),
      status: 'Pending',
      items: input.items,
      total,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerId: input.customerId || null,
      shippingAddress: input.shippingAddress,
      senderName: input.senderName,
      senderAddress: input.senderAddress,
      senderPhone: input.senderPhone,
      destination: input.destination,
      deliveryNotes: input.deliveryNotes || '',
      timeline: [
        { status: 'Pending', date: formatDateTime(now), note: STATUS_NOTES['Pending'] },
      ],
      createdBy: input.createdBy || null,
    };

    const docRef = await addDoc(collection(db, 'orders'), {
      ...newOrder,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const orderWithId = { ...newOrder, id: docRef.id };
    setOrders((prev) => [orderWithId, ...prev]);
    return orderWithId;
  }, []);

  const getOrderByTracking = useCallback(async (trackingNumber: string): Promise<Order | null> => {
    const q = query(
      collection(db, 'orders'),
      where('trackingNumber', '==', trackingNumber)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return docToOrder({ id: docSnap.id, data: docSnap.data.bind(docSnap) });
  }, []);

  const getOrdersByCustomerEmail = useCallback(async (email: string): Promise<Order[]> => {
    const q = query(
      collection(db, 'orders'),
      where('customerEmail', '==', email),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToOrder({ id: d.id, data: d.data.bind(d) }));
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus, note?: string) => {
    const timeNow = formatDateTime();
    const timelineEntry = {
      status,
      date: timeNow,
      note: note || STATUS_NOTES[status] || `Status updated to ${status}`,
    };

    const orderRef = doc(db, 'orders', orderId);
    const current = orders.find((o) => o.id === orderId);
    const timeline = current ? [...current.timeline, timelineEntry] : [timelineEntry];

    await updateDoc(orderRef, {
      status,
      timeline,
      updatedAt: serverTimestamp(),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, timeline }
          : order
      )
    );
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        refreshOrders,
        createOrder,
        getOrderByTracking,
        getOrdersByCustomerEmail,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
}
