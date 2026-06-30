import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Package, Clock, CheckCircle, Truck, MapPin, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import LiveMap from '@/components/LiveMap';
import type { Order } from '@/types';

const statusSteps = ['Pending', 'Processing', 'Packed', 'Shipped', 'In Transit', 'Delivered'];

const statusIcons: Record<string, typeof Clock> = {
  'Pending': Clock,
  'Processing': Package,
  'Packed': Package,
  'Shipped': Truck,
  'In Transit': MapPin,
  'Delivered': CheckCircle,
};

export default function TrackPage() {
  const [searchParams] = useSearchParams();
  const initialTracking = searchParams.get('tracking') || '';
  const { getOrderByTracking } = useOrders();
  const [trackingNumber, setTrackingNumber] = useState(initialTracking);
  const [searched, setSearched] = useState(!!initialTracking);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setSearched(true);
    setLoading(true);
    setError('');
    try {
      const result = await getOrderByTracking(trackingNumber.trim());
      setOrder(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-[#e4002b] font-semibold uppercase tracking-wider mb-2">Order Tracking</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-black tracking-tight">Track Your Order</h1>
          <p className="text-gray-500 mt-2">Enter your tracking number to see the current status</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., HIS-TRK-XXXXX-1234)"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#e4002b] text-white text-sm font-semibold hover:bg-black transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Track
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {searched && !loading && (
          <>
            {!order ? (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                <p className="text-gray-500 mb-4">We couldn't find an order with that tracking number.</p>
                <button
                  onClick={() => { setTrackingNumber(''); setSearched(false); setOrder(undefined); }}
                  className="text-[#e4002b] font-medium hover:underline"
                >
                  Try another number
                </button>
              </div>
            ) : (
              <div>
                {/* Order Summary */}
                <div className="bg-gray-50 p-6 mb-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-semibold font-mono">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Tracking Number</p>
                      <p className="text-sm font-semibold font-mono">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Order Date</p>
                      <p className="text-sm font-semibold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
                      <p className="text-sm font-semibold font-mono">${order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Live GPS Map */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Live Shipment Tracking</h2>
                  <LiveMap
                    senderAddress={order.senderAddress}
                    destination={order.destination || order.shippingAddress}
                    status={order.status}
                  />
                </div>

                {/* Timeline */}
                <h2 className="text-xl font-semibold mb-6">Shipment Timeline</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" />

                  <div className="space-y-6">
                    {statusSteps.map((step, index) => {
                      const isActive = statusSteps.indexOf(order.status) >= index;
                      const isCurrent = order.status === step;
                      const timelineEntry = order.timeline.find(t => t.status === step);
                      const StatusIcon = statusIcons[step];

                      return (
                        <div key={step} className={`relative flex items-start gap-4 ${!isActive ? 'opacity-40' : ''}`}>
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${isActive ? (isCurrent ? 'bg-[#e4002b] text-white' : 'bg-black text-white') : 'bg-gray-200 text-gray-400'}`}>
                            <StatusIcon size={18} />
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2">
                              <h3 className={`text-sm font-semibold ${isCurrent ? 'text-[#e4002b]' : 'text-black'}`}>{step}</h3>
                              {isCurrent && (
                                <span className="text-xs bg-[#e4002b] text-white px-2 py-0.5 font-medium">Current</span>
                              )}
                            </div>
                            {timelineEntry && (
                              <div className="mt-1">
                                <p className="text-xs text-gray-400">{timelineEntry.date}</p>
                                <p className="text-sm text-gray-600 mt-0.5">{timelineEntry.note}</p>
                              </div>
                            )}
                            {!timelineEntry && (
                              <p className="text-xs text-gray-400 mt-1">Pending update</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ship To</p>
                      <p className="text-sm font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.shippingAddress}</p>
                      {order.destination && (
                        <p className="text-sm text-[#e4002b] mt-1">Destination: {order.destination}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sender</p>
                      <p className="text-sm font-medium">{order.senderName}</p>
                      <p className="text-sm text-gray-500">{order.senderAddress}</p>
                      <p className="text-sm text-gray-500">{order.senderPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estimated Delivery</p>
                      <p className="text-sm font-medium">
                        {order.status === 'Delivered' ? 'Delivered' : '5-7 business days from order date'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Carrier: Seagate Metals Logistics
                      </p>
                    </div>
                    {order.deliveryNotes && (
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Delivery Notes</p>
                        <p className="text-sm text-gray-600">{order.deliveryNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-50">
                        <div className="w-16 h-16 bg-white overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{item.product.name}</p>
                          <p className="text-xs text-gray-400 font-mono">{item.product.partNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold font-mono">${(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[#e4002b] text-sm font-semibold hover:underline"
                  >
                    Continue Shopping <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
