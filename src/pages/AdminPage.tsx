import { useState, useEffect, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Package, DollarSign, Users, Truck, TrendingUp, Edit, Trash2, Plus, Search,
  Loader2, X, Save, RefreshCw, CheckCircle, ShoppingCart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useProducts } from '@/context/ProductContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Product, CartItem, User, OrderStatus } from '@/types';

const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  category: '',
  price: 0,
  partNumber: '',
  stock: 0,
  image: '',
  description: '',
  specs: {},
};

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { orders, updateOrderStatus, createOrder, refreshOrders } = useOrders();
  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct, seedProductsIfEmpty, refreshProducts } = useProducts();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'create-order'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Product modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>(EMPTY_PRODUCT);
  const [specsText, setSpecsText] = useState('{}');

  // Users
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Create order
  const [customers, setCustomers] = useState<User[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [manualCustomer, setManualCustomer] = useState({ name: '', email: '', address: '' });
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [senderInfo, setSenderInfo] = useState({
    name: 'Heritage Industrial Supply',
    address: '4500 Energy Drive, Houston, TX 77032',
    phone: '+1 (713) 555-0142',
  });
  const [destination, setDestination] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [createdTracking, setCreatedTracking] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderError, setOrderError] = useState('');

  const createOrderTotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [orderItems]
  );

  const loadCustomers = async () => {
    setUsersLoading(true);
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'user'));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          phone: data.phone || '',
          address: data.address || '',
          role: data.role === 'admin' ? 'admin' : 'user',
        } as User;
      });
      setCustomers(list);
      setUsers(list);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'customers' || activeTab === 'create-order') {
      loadCustomers();
    }
  }, [activeTab]);

  if (authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-[#e4002b]" />
    </div>
  );
  if (!user) return <Navigate to="/admin/heritage/login" />;
  if (!isAdmin) return <Navigate to="/admin/heritage/login" />;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingShipments = orders.filter(o => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Packed').length;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-500',
    'Processing': 'bg-blue-500',
    'Packed': 'bg-purple-500',
    'Shipped': 'bg-indigo-500',
    'In Transit': 'bg-orange-500',
    'Delivered': 'bg-green-500',
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'orders', label: 'Orders', icon: Truck },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'create-order', label: 'Create Order', icon: ShoppingCart },
  ];

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSeedProducts = async () => {
    setActionLoading(true);
    try {
      await seedProductsIfEmpty();
      showMessage('Products seeded successfully');
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'Failed to seed products', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({ ...product });
      setSpecsText(JSON.stringify(product.specs, null, 2));
    } else {
      setEditingProduct(null);
      setProductForm(EMPTY_PRODUCT);
      setSpecsText('{}');
    }
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setEditingProduct(null);
    setProductForm(EMPTY_PRODUCT);
    setSpecsText('{}');
  };

  const handleSaveProduct = async () => {
    let specs: Record<string, string> = {};
    try {
      specs = JSON.parse(specsText);
      if (typeof specs !== 'object' || Array.isArray(specs)) throw new Error('Invalid specs');
    } catch {
      showMessage('Specifications must be valid JSON object', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const data = { ...productForm, specs };
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        showMessage('Product updated');
      } else {
        await addProduct(data);
        showMessage('Product added');
      }
      closeProductModal();
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'Failed to save product', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setActionLoading(true);
    try {
      await deleteProduct(id);
      showMessage('Product deleted');
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'Failed to delete product', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    setActionLoading(true);
    try {
      await updateOrderStatus(orderId, status);
      showMessage(`Order status updated to ${status}`);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'Failed to update status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const addItemToOrder = () => {
    if (!selectedProductId) return;
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;
    setOrderItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + selectedQuantity }
            : i
        );
      }
      return [...prev, { product, quantity: selectedQuantity }];
    });
    setSelectedProductId('');
    setSelectedQuantity(1);
  };

  const removeOrderItem = (productId: string) => {
    setOrderItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const handleCreateOrder = async () => {
    setOrderError('');
    if (orderItems.length === 0) {
      setOrderError('Add at least one product to the order');
      return;
    }
    const name = selectedCustomer ? selectedCustomer.name : manualCustomer.name;
    const email = selectedCustomer ? selectedCustomer.email : manualCustomer.email;
    const addr = shippingAddress || (selectedCustomer?.address || '') || manualCustomer.address;

    if (!name) {
      setOrderError('Customer name is required');
      return;
    }
    if (!email) {
      setOrderError('Customer email is required');
      return;
    }
    if (!addr) {
      setOrderError('Shipping address is required');
      return;
    }

    setCreateOrderLoading(true);
    try {
      const order = await createOrder({
        items: orderItems,
        customerName: name,
        customerEmail: email,
        customerId: selectedCustomer?.id || null,
        shippingAddress: addr,
        senderName: senderInfo.name,
        senderAddress: senderInfo.address,
        senderPhone: senderInfo.phone,
        destination: destination || addr,
        deliveryNotes,
        createdBy: user?.id || null,
      });
      setCreatedTracking(order.trackingNumber);
      setOrderItems([]);
      setManualCustomer({ name: '', email: '', address: '' });
      setSelectedCustomerId('');
      setShippingAddress('');
      setDestination('');
      setDeliveryNotes('');
      setOrderError('');
      showMessage(`Order created. Tracking: ${order.trackingNumber}`);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setCreateOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#e4002b] font-semibold tracking-tight">HERITAGE</span>
            <span className="text-white/40">|</span>
            <span className="text-sm text-white/60">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">{user.name}</span>
            <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Exit</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className={`mb-6 p-4 text-sm ${message.type === 'error' ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-green-500/20 text-green-200 border border-green-500/30'}`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 p-1 w-fit overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key ? 'bg-[#e4002b] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: totalOrders.toString(), icon: Package, color: 'bg-blue-500' },
                { label: 'Total Products', value: totalProducts.toString(), icon: Package, color: 'bg-green-500' },
                { label: 'Pending Shipments', value: pendingShipments.toString(), icon: Truck, color: 'bg-orange-500' },
                { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-[#e4002b]' },
              ].map((card, i) => (
                <div key={i} className="bg-white/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <card.icon size={20} className="text-white/40" />
                    <div className={`w-2 h-2 rounded-full ${card.color}`} />
                  </div>
                  <p className="text-2xl font-semibold font-mono">{card.value}</p>
                  <p className="text-sm text-white/40 mt-1">{card.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <button
                  onClick={() => { refreshOrders(); refreshProducts(); }}
                  className="flex items-center gap-2 text-xs text-white/60 hover:text-white"
                >
                  <RefreshCw size={14} /> Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/40 font-medium">Order ID</th>
                      <th className="text-left py-3 text-white/40 font-medium">Customer</th>
                      <th className="text-left py-3 text-white/40 font-medium">Date</th>
                      <th className="text-left py-3 text-white/40 font-medium">Status</th>
                      <th className="text-right py-3 text-white/40 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 font-mono">{order.id}</td>
                        <td className="py-3">{order.customerName}</td>
                        <td className="py-3 text-white/40">{order.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs ${statusColors[order.status]} text-white px-2 py-0.5`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono">${order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-white/40">No orders yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold">Product Inventory</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSeedProducts}
                  disabled={actionLoading || productsLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={16} /> Seed Default Products
                </button>
                <button
                  onClick={() => openProductModal()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#e4002b] text-white text-sm font-medium hover:bg-[#c40024] transition-colors"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-white/40 font-medium">Product</th>
                    <th className="text-left py-3 text-white/40 font-medium">Part #</th>
                    <th className="text-left py-3 text-white/40 font-medium">Category</th>
                    <th className="text-right py-3 text-white/40 font-medium">Price</th>
                    <th className="text-right py-3 text-white/40 font-medium">Stock</th>
                    <th className="text-right py-3 text-white/40 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/10 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-white/40">{product.partNumber}</td>
                      <td className="py-3">{product.category}</td>
                      <td className="py-3 text-right font-mono">${product.price.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openProductModal(product)} className="p-1.5 text-white/40 hover:text-white transition-colors"><Edit size={14} /></button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-lg font-semibold mb-6">Order Management</h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by order ID, tracking, or customer..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-white/40 font-medium">Order ID</th>
                    <th className="text-left py-3 text-white/40 font-medium">Customer</th>
                    <th className="text-left py-3 text-white/40 font-medium">Tracking</th>
                    <th className="text-left py-3 text-white/40 font-medium">Date</th>
                    <th className="text-left py-3 text-white/40 font-medium">Status</th>
                    <th className="text-right py-3 text-white/40 font-medium">Total</th>
                    <th className="text-right py-3 text-white/40 font-medium">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 font-mono">{order.id}</td>
                      <td className="py-3">{order.customerName}</td>
                      <td className="py-3 font-mono text-white/40">{order.trackingNumber}</td>
                      <td className="py-3 text-white/40">{order.date}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs ${statusColors[order.status]} text-white px-2 py-0.5`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono">${order.total.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          disabled={actionLoading}
                          className="bg-white/5 border border-white/10 text-white text-xs px-2 py-1 focus:outline-none disabled:opacity-50"
                        >
                          {(['Pending', 'Processing', 'Packed', 'Shipped', 'In Transit', 'Delivered'] as OrderStatus[]).map(s => (
                            <option key={s} value={s} className="bg-black text-white">{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div>
            <h2 className="text-lg font-semibold mb-6">Customer Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-white/40 font-medium">Customer</th>
                    <th className="text-left py-3 text-white/40 font-medium">Email</th>
                    <th className="text-left py-3 text-white/40 font-medium">Company</th>
                    <th className="text-left py-3 text-white/40 font-medium">Phone</th>
                    <th className="text-left py-3 text-white/40 font-medium">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    <tr><td colSpan={5} className="py-8 text-center"><Loader2 size={20} className="animate-spin mx-auto" /></td></tr>
                  ) : users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3">{u.name}</td>
                      <td className="py-3 text-white/40">{u.email}</td>
                      <td className="py-3 text-white/40">{u.company || '-'}</td>
                      <td className="py-3 text-white/40">{u.phone || '-'}</td>
                      <td className="py-3 text-white/40">{u.address || '-'}</td>
                    </tr>
                  ))}
                  {!usersLoading && users.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-white/40">No customers found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Order */}
        {activeTab === 'create-order' && (
          <div>
            <h2 className="text-lg font-semibold mb-6">Create Order for Customer</h2>

            {createdTracking && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-200 text-sm flex items-center gap-3">
                <CheckCircle size={18} />
                Order created. Tracking number: <span className="font-mono font-semibold">{createdTracking}</span>
                <button onClick={() => setCreatedTracking('')} className="ml-auto text-green-200 hover:text-white"><X size={16} /></button>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Customer & Items */}
              <div className="space-y-6">
                <div className="bg-white/5 p-6">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/60">Customer</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Select Registered Customer</label>
                      <select
                        value={selectedCustomerId}
                        onChange={(e) => setSelectedCustomerId(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      >
                        <option value="" className="bg-black">-- Manual entry --</option>
                        {customers.map(c => (
                          <option key={c.id} value={c.id} className="bg-black">{c.name} ({c.email})</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/40 mb-1">Customer Name *</label>
                        <input
                          type="text"
                          value={selectedCustomer ? selectedCustomer.name : manualCustomer.name}
                          onChange={(e) => {
                            if (selectedCustomer) return;
                            setManualCustomer(p => ({ ...p, name: e.target.value }));
                          }}
                          disabled={!!selectedCustomer}
                          className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1">Customer Email *</label>
                        <input
                          type="email"
                          value={selectedCustomer ? selectedCustomer.email : manualCustomer.email}
                          onChange={(e) => {
                            if (selectedCustomer) return;
                            setManualCustomer(p => ({ ...p, email: e.target.value }));
                          }}
                          disabled={!!selectedCustomer}
                          className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Shipping Address *</label>
                      <input
                        type="text"
                        value={shippingAddress || (selectedCustomer?.address || '') || manualCustomer.address}
                        onChange={(e) => {
                          setShippingAddress(e.target.value);
                          if (!selectedCustomer) {
                            setManualCustomer(p => ({ ...p, address: e.target.value }));
                          }
                        }}
                        placeholder="Enter full shipping address"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/60">Add Products</h3>
                  <div className="flex gap-3 mb-4">
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                    >
                      <option value="" className="bg-black">Select product</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id} className="bg-black">{p.name} — ${p.price.toLocaleString()}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                    />
                    <button
                      onClick={addItemToOrder}
                      disabled={!selectedProductId}
                      className="px-4 py-2 bg-[#e4002b] text-white text-sm font-medium hover:bg-[#c40024] transition-colors disabled:bg-gray-600"
                    >
                      Add
                    </button>
                  </div>

                  {orderItems.length === 0 ? (
                    <p className="text-white/40 text-sm">No items added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {orderItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between p-3 bg-white/5">
                          <div className="flex items-center gap-3">
                            <img src={item.product.image} alt="" className="w-10 h-10 object-cover" />
                            <div>
                              <p className="text-sm font-medium">{item.product.name}</p>
                              <p className="text-xs text-white/40 font-mono">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-mono">${(item.product.price * item.quantity).toLocaleString()}</span>
                            <button onClick={() => removeOrderItem(item.product.id)} className="text-white/40 hover:text-red-400"><X size={16} /></button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 border-t border-white/10">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-semibold font-mono">${createOrderTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-6">
                <div className="bg-white/5 p-6">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/60">Sender Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Sender Name</label>
                      <input
                        type="text"
                        value={senderInfo.name}
                        onChange={(e) => setSenderInfo(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Sender Address</label>
                      <input
                        type="text"
                        value={senderInfo.address}
                        onChange={(e) => setSenderInfo(p => ({ ...p, address: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Sender Phone</label>
                      <input
                        type="text"
                        value={senderInfo.phone}
                        onChange={(e) => setSenderInfo(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/60">Delivery Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Destination</label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g., Offshore Rig, Job Site, Warehouse"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Delivery Notes</label>
                      <textarea
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        rows={4}
                        placeholder="Loading instructions, contact person, gate codes, etc."
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {orderError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {orderError}
                  </div>
                )}

                <button
                  onClick={handleCreateOrder}
                  disabled={createOrderLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#e4002b] text-white py-4 text-sm font-semibold hover:bg-[#c40024] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {createOrderLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  {createOrderLoading ? 'Creating Order...' : 'Create Order & Generate Tracking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={closeProductModal} className="p-2 text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1">Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Category</label>
                <input
                  type="text"
                  value={productForm.category}
                  onChange={(e) => setProductForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Part Number</label>
                <input
                  type="text"
                  value={productForm.partNumber}
                  onChange={(e) => setProductForm(p => ({ ...p, partNumber: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Price</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm(p => ({ ...p, price: Number(e.target.value) }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Stock</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm(p => ({ ...p, stock: Number(e.target.value) }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1">Image URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm(p => ({ ...p, image: e.target.value }))}
                  placeholder="/images/product-name.jpg"
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1">Specifications (JSON object)</label>
                <textarea
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={closeProductModal} className="px-5 py-2 border border-white/10 text-sm font-medium hover:bg-white/5">Cancel</button>
              <button
                onClick={handleSaveProduct}
                disabled={actionLoading}
                className="px-5 py-2 bg-[#e4002b] text-white text-sm font-medium hover:bg-[#c40024] flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
