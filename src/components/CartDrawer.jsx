import React from 'react';
import { ShoppingBag, X, Minus, Plus } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, cartTotal, onCheckout }) {
  if (!isOpen) return null;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="text-orange-500" /> Your Cart ({cartCount})
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                    <span className="text-xs text-gray-500">{item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-orange-600">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-orange-600">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Subtotal:</span>
                <span>{cartTotal}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition"
              >
                Checkout Now ({cartTotal})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}