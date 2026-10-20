import React from 'react';
import { Star, Heart, Plus } from 'lucide-react';

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition ${
            isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
              <Star size={14} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-lg font-black text-gray-900">{product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white p-3 rounded-2xl transition duration-300 flex items-center justify-center font-bold shadow-sm"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}