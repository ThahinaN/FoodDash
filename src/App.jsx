import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { products, categories } from './data/products';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Home from './pages/Home';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      showNotification(`Removed ${product.name} from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      showNotification(`Added ${product.name} to wishlist`);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification(`Added ${product.name} to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle size={20} />
            <span>{notification}</span>
          </div>
        )}

        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          setIsCartOpen={setIsCartOpen}
          setIsWishlistOpen={setIsWishlistOpen}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Define your routes here */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredProducts={filteredProducts}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                setSearchQuery={setSearchQuery}
              />
            }
          />
                 </Routes>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          cartTotal={cartTotal}
          onCheckout={() => {
            alert('Order placed successfully! Enjoy your food!');
            setCart([]);
            setIsCartOpen(false);
          }}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      </div>
    </Router>
  );
}