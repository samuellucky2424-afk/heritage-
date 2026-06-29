import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Package, CheckCircle, Loader2 } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import type { Order } from '@/types';

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const { orders, getOrderByTracking } = useOrders();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const findOrder = async () => {
      if (!id) return;
      setLoading(true);
      // Try by order ID first
      const found = orders.find(o => o.id === id);
      if (found) {
        setOrder(found);
      } else {
        // Try by tracking number
        const byTracking = await getOrderByTracking(id);
        setOrder(byTracking);
      }
      setLoading(false);
    };
    findOrder();
  }, [id, orders, getOrderByTracking]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 size={32} className="animate-spin text-[#e4002b]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
          <Link to="/dashboard" className="text-[#e4002b] font-medium hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16 print:bg-white print:pt-0">
      {/* Action Bar - hidden on print */}
      <div className="max-w-4xl mx-auto px-6 mb-8 print:hidden">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-sm font-medium hover:border-black transition-colors"
            >
              <Printer size={16} /> Print Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div ref={receiptRef} className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow-lg print:shadow-none">
          {/* Header */}
          <div className="bg-[#e4002b] px-8 py-6 print:bg-[#e4002b]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white flex items-center justify-center font-bold text-[#e4002b] text-xl">H</div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">HERITAGE INDUSTRIAL SUPPLY</h1>
                  <p className="text-white/80 text-sm">4500 Energy Drive, Houston, TX 77032</p>
                  <p className="text-white/80 text-sm">+1 (713) 555-0100 | sales@heritageindustrial.com</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-white text-lg font-bold">ORDER RECEIPT</h2>
                <p className="text-white/80 text-sm">Invoice #{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Order Info Bar */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Order Date</p>
                <p className="text-sm font-semibold">{order.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Tracking Number</p>
                <p className="text-sm font-semibold font-mono">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 mt-0.5 ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' || order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-lg font-bold font-mono">${order.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="px-8 py-6 grid md:grid-cols-2 gap-8 border-b border-gray-200">
            {/* Bill To */}
            <div>
              <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Bill To</h3>
              <div className="text-sm">
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-gray-500">{order.customerEmail}</p>
                <p className="text-gray-500 mt-2">{order.shippingAddress}</p>
              </div>
            </div>

            {/* Ship To */}
            <div>
              <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Ship To</h3>
              <div className="text-sm">
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-gray-500">{order.shippingAddress}</p>
                {order.destination && (
                  <p className="text-[#e4002b] font-medium mt-1">Destination: {order.destination}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Sender</h3>
                <div className="text-sm">
                  <p className="font-semibold">{order.senderName}</p>
                  <p className="text-gray-500">{order.senderAddress}</p>
                  <p className="text-gray-500">{order.senderPhone}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Shipping Details</h3>
                <div className="text-sm">
                  <p className="text-gray-500">Carrier: Heritage Freight Logistics</p>
                  <p className="text-gray-500">
                    Est. Delivery: {order.status === 'Delivered' ? 'Delivered' : '5-7 business days'}
                  </p>
                  {order.deliveryNotes && (
                    <p className="text-gray-500 mt-1">Notes: {order.deliveryNotes}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="px-8 py-6">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Order Items</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-400 font-medium">Item</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Part Number</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Qty</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Unit Price</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium">{item.product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-gray-500">{item.product.partNumber}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right font-mono">${item.product.price.toLocaleString()}</td>
                    <td className="py-3 text-right font-mono font-semibold">${(item.product.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="max-w-xs ml-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-mono">${order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Shipping</span>
                <span className="font-mono text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Tax</span>
                <span className="font-mono">Included</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3 mt-3">
                <span>Total</span>
                <span className="font-mono">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Timeline */}
          <div className="px-8 py-6 border-t border-gray-200">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Shipment Timeline</h3>
            <div className="space-y-3">
              {order.timeline.map((entry, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    i === order.timeline.length - 1 ? 'bg-[#e4002b] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i === order.timeline.length - 1 ? <CheckCircle size={14} /> : <span className="text-xs">{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{entry.status}</span>
                      {i === order.timeline.length - 1 && (
                        <span className="text-xs bg-[#e4002b] text-white px-2 py-0.5 font-medium">Latest</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{entry.date}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{entry.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="text-center text-sm text-gray-400">
              <p className="font-medium text-gray-600 mb-1">Thank you for your business!</p>
              <p>Heritage Industrial Supply | +1 (713) 555-0100 | sales@heritageindustrial.com</p>
              <p className="mt-1">For questions about this order, please reference tracking number: <span className="font-mono font-semibold text-gray-600">{order.trackingNumber}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
