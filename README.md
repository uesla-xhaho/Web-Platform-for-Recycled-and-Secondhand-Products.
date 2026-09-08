# Circular Marketplace

A full-stack sustainable e-commerce marketplace for second-hand and upcycled products. The app includes a static HTML/CSS/JavaScript frontend and a Node.js/Express API backed by SQL Server through Sequelize.

## Features

- Product browsing, search, filtering, detail pages, cart, checkout, reviews, and wishlist support
- Customer authentication with JWT-based sessions
- Artisan registration, product management, order tracking, and sales dashboard routes
- Admin routes for metrics, users, artisan approval, featured products, and product removal
- Product metadata for category, subcategory, materials, condition, eco impact, pricing, stock, shipping, and images
- Security middleware for hashed passwords, auth checks, role authorization, input validation, rate limiting, Helmet, and restricted uploads

## Tech Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js, Express
- Database: Microsoft SQL Server
- ORM: Sequelize
- Auth: JWT

## Project Structure

```text
E-commerce/
  backend/
    sql/setup.sql
    scripts/seed.js
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    package.json
  frontend/
    assets/
      css/
      data/
      images/
      js/
    index.html
    browse.html
    product.html
    login.html
    register.html
    cart.html
    artisan.html
    admin.html
    serve.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- Microsoft SQL Server, if running with database-backed API routes

## Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
USE_DB=false
DB_HOST=localhost
DB_PORT=1433
DB_INSTANCE=
DB_NAME=CircularMarketplace
DB_USER=sa
DB_PASSWORD=ChangeThisStrongPassword!
DB_ENCRYPT=false
DB_TRUST_CERT=true
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
PLATFORM_COMMISSION_PERCENT=8
```

Start the API:

```bash
npm run dev
```

The backend starts on `http://localhost:5000` by default. With `USE_DB=false`, only the health endpoint and disabled-database response are available. Set `USE_DB=true` and configure the `DB_*` values to enable the API routes.

## Database Setup

Create the SQL Server database:

```sql
CREATE DATABASE CircularMarketplace;
```

Alternatively, run the setup script in SQL Server Management Studio:

```text
backend/sql/setup.sql
```

Tables are created by Sequelize when the backend starts with database mode enabled.

Seed demo data:

```bash
cd backend
npm run seed
```

The seed command resets tables and creates demo users/products, so use it only for local development.

Demo accounts:

```text
Admin:    admin@circular.local / Admin123!
Artisan:  arta@artisan.local / Artisan123!
Customer: customer@demo.local / Customer123!
```

## Frontend Setup

The frontend expects the API at `http://localhost:5000/api`, configured in `frontend/assets/js/api.js`.

Serve the static frontend:

```bash
cd frontend
npx serve .
```

Open the served URL in your browser. If your static server uses a different origin, add it to `CORS_ORIGIN` in `backend/.env`.

## Main API Routes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/me`
- `GET /api/products`
- `GET /api/products/featured`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/mine`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id/status`
- `GET /api/reviews/:productId`
- `POST /api/reviews/:productId`
- `GET /api/wishlist`
- `POST /api/wishlist/toggle`
- `GET /api/admin/metrics`
- `GET /api/admin/users`
- `GET /api/admin/artisans/pending`
- `PATCH /api/admin/artisans/:userId/approve`
- `PATCH /api/admin/products/:productId/feature`
- `DELETE /api/admin/products/:productId`
- `GET /api/artisan/dashboard`
- `GET /api/artisan/products`
- `GET /api/artisan/orders`

## Useful Scripts

Run from `backend/`:

- `npm run dev`: start the API with nodemon
- `npm start`: start the API with Node
- `npm run seed`: reset and seed local database tables
