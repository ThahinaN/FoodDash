import React from 'react';
import { Heart, X } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onAddToCart, onToggleWishlist }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Heart className="text-rose-500" /> My Wishlist ({wishlist.length})
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Heart size={48} className="mx-auto mb-3 opacity-30" />
                <p>No favorites added yet.</p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                    <span className="text-xs font-bold text-orange-600">{item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      onToggleWishlist(item);
                    }}
                    className="bg-orange-500 text-white text-xs px-3 py-2 rounded-xl font-bold hover:bg-orange-600 transition"
                  >
                    Move to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}