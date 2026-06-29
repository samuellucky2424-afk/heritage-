import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <span className="text-sm text-gray-400">({items.length} items)</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-[#e4002b] font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50">
                  <div className="w-20 h-20 bg-white overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{item.product.partNumber}</p>
                    <p className="text-sm font-semibold font-mono mt-1">${item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-[#e4002b] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-semibold font-mono">${totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Shipping calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#e4002b] text-white py-4 text-sm font-semibold hover:bg-black transition-all"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-gray-500 hover:text-black mt-3 py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
