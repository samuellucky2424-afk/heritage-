import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    zip: '',
    senderName: 'Heritage Industrial Supply',
    senderAddress: '4500 Energy Drive, Houston, TX 77032',
    senderPhone: '+1 (713) 555-0142',
    destination: '',
    deliveryNotes: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');
  const [newTrackingNumber, setNewTrackingNumber] = useState('');

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-[#e4002b] font-medium hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;
      const destination = formData.destination || `${formData.city}, ${formData.state} ${formData.zip}`;
      const order = await createOrder({
        items,
        customerName: formData.name,
        customerEmail: formData.email,
        customerId: user?.id || null,
        shippingAddress,
        senderName: formData.senderName,
        senderAddress: formData.senderAddress,
        senderPhone: formData.senderPhone,
        destination,
        deliveryNotes: formData.deliveryNotes,
        createdBy: user?.id || null,
      });
      setNewOrderId(order.id);
      setNewTrackingNumber(order.trackingNumber);
      clearCart();
      setOrderComplete(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <div className="max-w-lg mx-auto px-6 py-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">Thank you for your order. We've sent a confirmation to your email.</p>
          <div className="bg-white p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                <p className="text-sm font-semibold font-mono">{newOrderId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Tracking Number</p>
                <p className="text-sm font-semibold font-mono">{newTrackingNumber}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              to={`/receipt/${newOrderId}`}
              className="inline-flex items-center gap-2 bg-[#e4002b] text-white px-6 py-3 text-sm font-semibold hover:bg-black transition-all"
            >
              View Receipt
            </Link>
            <Link
              to={`/track?tracking=${newTrackingNumber}`}
              className="inline-flex items-center gap-2 border border-black text-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-all"
            >
              <Truck size={16} /> Track Order
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 text-sm font-semibold hover:border-black hover:text-black transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <h1 className="text-3xl font-semibold text-black tracking-tight mb-2">Checkout</h1>
        <p className="text-gray-500 mb-12">Complete your order details below</p>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12">
          {[
            { key: 'shipping', label: 'Shipping', icon: Truck },
            { key: 'payment', label: 'Payment', icon: CreditCard },
            { key: 'confirm', label: 'Confirm', icon: CheckCircle },
          ].map((s, i) => {
            const isActive = step === s.key;
            const isDone = ['shipping', 'payment', 'confirm'].indexOf(step) > i;
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center ${isDone ? 'bg-black text-white' : isActive ? 'bg-[#e4002b] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <s.icon size={18} />
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-black' : isDone ? 'text-black' : 'text-gray-400'}`}>{s.label}</span>
                {i < 2 && <div className={`w-8 h-0.5 ${isDone ? 'bg-black' : 'bg-gray-200'}`} />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">State *</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">ZIP *</label>
                      <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" required />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">Destination / Delivery Location</label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="e.g., Offshore Rig Alpha, Gulf of Mexico" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">Delivery Notes</label>
                    <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={handleInputChange} rows={3} placeholder="Gate code, loading dock instructions, contact on arrival, etc." className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="mt-8 px-8 py-4 bg-[#e4002b] text-white text-sm font-semibold hover:bg-black transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <div className="p-6 bg-gray-50 mb-6">
                  <p className="text-sm text-gray-500">This is a demo application. No actual payment will be processed.</p>
                  <p className="text-sm text-gray-500 mt-1">Click "Place Order" to complete your purchase.</p>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Card Number</label>
                    <input type="text" placeholder="4242 4242 4242 4242" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Cardholder Name</label>
                    <input type="text" placeholder="Name on card" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-8 py-4 border border-gray-200 text-sm font-semibold hover:border-black transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('confirm')}
                    className="px-8 py-4 bg-[#e4002b] text-white text-sm font-semibold hover:bg-black transition-all"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="bg-gray-50 p-6 mb-6">
                  <h3 className="text-sm font-semibold mb-3">Shipping To:</h3>
                  <p className="text-sm text-gray-600">{formData.name}</p>
                  <p className="text-sm text-gray-600">{formData.address}</p>
                  <p className="text-sm text-gray-600">{formData.city}, {formData.state} {formData.zip}</p>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                  {formData.destination && <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Destination:</span> {formData.destination}</p>}
                  {formData.deliveryNotes && <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Notes:</span> {formData.deliveryNotes}</p>}
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-8 py-4 border border-gray-200 text-sm font-semibold hover:border-black transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="px-8 py-4 bg-[#e4002b] text-white text-sm font-semibold hover:bg-black transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    Place Order — ${totalPrice.toLocaleString()}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold font-mono">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-mono">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-mono">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-mono">Included</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-semibold font-mono">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
