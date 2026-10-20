import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  wishlist,
  toggleWishlist,
  addToCart
}) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md">
              ⚡ Fast 30-Minute Delivery
            </span>
            <h1 className="text-4xl sm:text-6xl font-black mt-4 leading-tight">
              Delicious Food, <br />Delivered To You.
            </h1>
            <p className="mt-4 text-orange-100 text-lg max-w-lg">
              Explore top-rated meals crafted by master chefs and delivered instantly to your doorstep.
            </p>
          </div>
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80"
              alt="Food spread"
              className="rounded-3xl shadow-2xl object-cover h-80 w-full transform rotate-2 hover:rotate-0 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Explore Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-orange-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            {selectedCategory === 'All' ? 'All Delicious Items' : `${selectedCategory} Dishes`}
          </h2>
          <span className="text-sm text-gray-500">{filteredProducts.length} items available</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-500">No dishes found matching your criteria.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-orange-600 font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}