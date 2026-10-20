# API Integration Contract

## Switching from Mock Data to Real API
1. Open `src/services/productService.js`.
2. Replace the local array calls with `fetch()` or `axios` requests pointing to your backend base URL.
3. Use environment variables defined in `.env`:
   ```env
   VITE_API_BASE_URL=[https://api.yourdomain.com](https://api.yourdomain.com)