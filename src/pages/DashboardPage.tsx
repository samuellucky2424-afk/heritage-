import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, User, ChevronRight, Truck, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const { orders, loading } = useOrders();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const userOrders = useMemo(
    () => (user ? orders.filter((o) => o.customerEmail === user.email) : []),
    [orders, user]
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Please sign in</h1>
          <Link to="/login" className="text-[#e4002b] font-medium hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const statusIcons: Record<string, typeof Clock> = {
    'Pending': Clock,
    'Processing': Package,
    'Packed': Package,
    'Shipped': Truck,
    'In Transit': Truck,
    'Delivered': CheckCircle,
  };

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-50 text-yellow-700',
    'Processing': 'bg-blue-50 text-blue-700',
    'Packed': 'bg-purple-50 text-purple-700',
    'Shipped': 'bg-indigo-50 text-indigo-700',
    'In Transit': 'bg-orange-50 text-orange-700',
    'Delivered': 'bg-green-50 text-green-700',
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs text-[#e4002b] font-semibold uppercase tracking-wider mb-2">Account</p>
          <h1 className="text-3xl font-semibold text-black tracking-tight">My Dashboard</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#e4002b] rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3">
                  {user.name.charAt(0)}
                </div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                {user.company && <p className="text-sm text-gray-400 mt-1">{user.company}</p>}
              </div>
              <nav className="p-3">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Package size={16} /> Orders
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <User size={16} /> Profile
                </button>
                <Link
                  to="/track"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MapPin size={16} /> Track Order
                </Link>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' ? (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 size={32} className="animate-spin text-[#e4002b]" />
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="bg-white border border-gray-100 p-12 text-center">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link to="/shop" className="text-[#e4002b] font-medium hover:underline">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => {
                      const StatusIcon = statusIcons[order.status] || Clock;
                      return (
                        <div key={order.id} className="bg-white border border-gray-100 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-sm font-mono font-semibold">{order.id}</span>
                                <span className={`text-xs px-2 py-0.5 font-medium ${statusColors[order.status]}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">{order.date} &middot; {order.items.length} item(s)</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-semibold font-mono">${order.total.toLocaleString()}</span>
                              <Link
                                to={`/receipt/${order.id}`}
                                className="flex items-center gap-1 text-[#e4002b] text-sm font-medium hover:underline"
                              >
                                Receipt <ChevronRight size={14} />
                              </Link>
                              <Link
                                to={`/track?tracking=${order.trackingNumber}`}
                                className="flex items-center gap-1 text-gray-500 text-sm font-medium hover:text-black hover:underline"
                              >
                                Track <ChevronRight size={14} />
                              </Link>
                            </div>
                          </div>
                          <div className="border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <StatusIcon size={14} className="text-[#e4002b]" />
                              <span>Tracking: <span className="font-mono">{order.trackingNumber}</span></span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <div className="bg-white border border-gray-100 p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                      <p className="text-sm font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Email</label>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Company</label>
                      <p className="text-sm font-medium">{user.company || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                      <p className="text-sm font-medium">{user.phone || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Shipping Address</label>
                      <p className="text-sm font-medium">{user.address || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
