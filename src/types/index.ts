export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  partNumber: string;
  stock: number;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderTimelineEntry {
  status: string;
  date: string;
  note: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Packed' | 'Shipped' | 'In Transit' | 'Delivered';

export interface Order {
  id: string;
  trackingNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerId?: string | null;
  shippingAddress: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  destination: string;
  deliveryNotes?: string;
  timeline: OrderTimelineEntry[];
  createdBy?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}
