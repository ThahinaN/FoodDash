import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += 1;
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'INCREMENT_QTY': {
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    case 'DECREMENT_QTY': {
      return {
        ...state,
        items: state.items
          .map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
          .filter(item => item.quantity > 0)
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}