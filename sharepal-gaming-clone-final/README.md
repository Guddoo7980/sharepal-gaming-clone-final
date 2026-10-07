# SharePal Gaming Gadgets Clone — MERN + Vercel

A deployment-ready recreation of SharePal's Bangalore gaming-rental listing page. The UI is built in React/Vite; the API uses Express/Node; MongoDB/Mongoose is supported; and the exact assignment product JSON is included as a reliable fallback.

## What was fixed in this version

- The supplied `product-list.json` schema is used **exactly** (`id`, `name`, `image`, `rating`, `booked_count`, `tag`, `per_day_rent`, `out_of_stock`).
- Product listing is dynamic through `GET /api/products` instead of importing a mismatched frontend fixture.
- Vercel deployment works with the included `api/index.js` serverless Express entry point.
- Login is a real API flow using JWT.
- A guaranteed demo login works even without MongoDB.
- Registration and persistent non-demo accounts work when `MONGODB_URI` is configured.
- MongoDB product data is used when the collection contains products; otherwise the API transparently falls back to the supplied JSON.
- Date selection dynamically calculates rental duration and estimated total.
- Search, category filters, sorting, stock state, wishlist state and cart state are interactive.

## Demo login

- Email: `demo@sharepalclone.com`
- Password: `Demo@123`

You can override these with `DEMO_EMAIL` and `DEMO_PASSWORD` environment variables.

## Local development

Requires Node.js 18+ (Node 20+ recommended).

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

The Vite dev server proxies `/api/*` requests to the Express server at `http://localhost:5000`.

## MongoDB setup (optional but recommended for a full MERN demonstration)

1. Create a MongoDB Atlas database.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Seed the supplied products:

```bash
npm run seed
```

The application still works without MongoDB because the API uses `data/product-list.json` as a fallback.

## Vercel deployment

This repository is prepared for a single Vercel deployment.

1. Push the **contents of this folder** to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Vercel should detect Vite. The included `vercel.json` uses:
   - Build command: `npm run build`
   - Output directory: `dist`
   - `/api/*` rewritten to the Express serverless function in `api/index.js`
4. Add environment variables in **Vercel → Project Settings → Environment Variables**:
   - `MONGODB_URI` (optional for products, required for registration)
   - `JWT_SECRET` (strongly recommended)
   - `DEMO_EMAIL` (optional)
   - `DEMO_PASSWORD` (optional)
5. Deploy.

### Important
Do **not** set a separate frontend API URL for Vercel. The frontend calls relative URLs such as `/api/products` and `/api/auth/login`, so the same project serves both frontend and backend.

## GitHub push example

```bash
git init
git add .
git commit -m "SharePal gaming rental clone"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## API endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me` with `Authorization: Bearer <token>`

Product API query parameters include `q`, `category`, `tag`, `inStock` and `sort` (`trending`, `popularity`, `rating`, `priceLow`, `priceHigh`).

## Testing before submission

```bash
npm run check
npm run build
```

`npm run check` verifies the API health route, all 23 supplied products and the working demo login.

## Source-data note

The product data in `data/product-list.json` is the exact JSON supplied for the assignment. Product images remain the URLs supplied in that JSON.

## Trademark / assignment note

This is an educational/technical-assignment recreation. SharePal names, visual references and linked product imagery belong to their respective owner(s). Do not present this project as the official SharePal website.
