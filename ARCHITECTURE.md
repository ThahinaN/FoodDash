# Architecture Overview

## Folder Structure
- `src/components/`: Reusable UI elements (Navbar, ProductCard, Drawers).
- `src/pages/`: Routed views (Home, Shop, Cart, Checkout, NotFound).
- `src/services/`: API abstraction layer (`productService.js`) handling mock responses and future API hooks.
- `src/data/`: Static mock product catalog and categories.

## State Management
- Global states (Cart, Wishlist, Search, Filters) are managed in `App.jsx` and passed down or can be accessed via props.
- Form inputs utilise local component state with client-side validation logic.