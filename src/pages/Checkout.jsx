import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  
  // Form input states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Requirement states: Validation, Loading, Error, Success
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  // 1. Client-side Validation
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!address.trim()) newErrors.address = 'Delivery address is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNetworkError(false);

    if (!validateForm()) {
      return; // Stops submission if validation fails
    }

    // 2. Loading State Trigger
    setIsLoading(true);

    // Simulate network delay and error handling
    setTimeout(() => {
      setIsLoading(false);
      
      // Toggle to true if you want to test the error handling state
      const simulateServerFailure = false; 

      if (simulateServerFailure) {
        setNetworkError(true); // Triggers Error Handling State
      } else {
        setOrderPlaced(true); // Triggers Success State
      }
    }, 1500);
  };

  // 3. Recovery Action (Retry button for network/server failure)
  const handleRetry = () => {
    setNetworkError(false);
    handleSubmit({ preventDefault: () => {} });
  };

  // Success State (Empty state / Completion view)
  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-4">
          <CheckCircle size={64} className="mx-auto text-emerald-500 animate-bounce" />
          <h1 className="text-2xl font-black text-gray-900">Order Placed Successfully!</h1>
          <p className="text-gray-500 text-sm">Your order is confirmed and on its way to your doorstep.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-bold transition shadow-lg shadow-orange-500/30"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-6 transition">
        <ArrowLeft size= {16} /> Back to Menu
      </Link>

      <h1 className="text-3xl font-black text-gray-900 mb-6">Checkout & Delivery</h1>

      {/* Error Handling & Recovery Action Banner */}
      {networkError && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">Server connection failed. Please try again.</span>
          </div>
          <button
            onClick={handleRetry}
            className="bg-rose-600 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.name ? 'border-rose-500 focus:ring-rose-200' : 'border-gray-200 focus:ring-orange-500'
            }`}
          />
          {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-rose-500 focus:ring-rose-200' : 'border-gray-200 focus:ring-orange-500'
            }`}
          />
          {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Address</label>
          <textarea
            rows="3"
            placeholder="House no, street name, landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.address ? 'border-rose-500 focus:ring-rose-200' : 'border-gray-200 focus:ring-orange-500'
            }`}
          ></textarea>
          {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            <span>Place Order</span>
          )}
        </button>
      </form>
    </div>
  );
}