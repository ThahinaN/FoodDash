import React from 'react';
import { Search, ShoppingBag, Heart, Flame } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, setSelectedCategory }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCategory('All')}>
          <div className="bg-orange-500 text-white p-2.5 rounded-2xl shadow-md shadow-orange-500/30">
            <Flame size={24} />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            FoodDash
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search delicious dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100/80 border-0 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-3 rounded-full hover:bg-gray-100 transition text-gray-700"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2 font-semibold transition"
          >
            <ShoppingBag size={20} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}