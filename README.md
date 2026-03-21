# Achaia Wood Shop API

<div align="center">

**REST API backend for the Achaia Wood Shop — a Greek woodworking and materials supply company.**

[![Live API](https://img.shields.io/badge/🔗%20Live%20API-achaia--wood--api.vercel.app-green?style=for-the-badge)](https://achaia-wood-api.vercel.app)
[![Frontend](https://img.shields.io/badge/🌐%20Frontend-achaiawood.gr-blue?style=for-the-badge)](https://achaiawood.gr)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Serverless-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)

---

## 📖 Overview

This is the backend REST API for **ΑΝΤΩΝΙΑΔΗΣ ΕΠΕ** — an established woodworking and wood materials company based in Patras, Greece. The API powers:

- **Two separate product catalogues** — Βιομηχανική Ξυλεία (wood) and Εκθεση - Gallery
- **Hierarchical category management** — 2-level for Wood, 3-level (with Company) for Gallery
- **Customer order submissions** — with file attachments stored as base64
- **Featured product management** — for dynamic homepage showcasing
- **Admin-only routes** protected by JWT authentication

The API is deployed as a **Vercel Serverless Function** backed by a **Neon PostgreSQL** database. All models are managed via **Sequelize ORM** with `sync({ alter: true })` on each cold start.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Node.js + Express.js** | HTTP server and routing |
| **TypeScript** | Type-safe development |
| **Sequelize ORM** | Database abstraction and model management |
| **PostgreSQL (Neon)** | Serverless relational database |
| **JWT (jsonwebtoken)** | Stateless admin authentication |
| **bcryptjs** | Password hashing |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **Vercel Serverless** | Deployment target |

---

## 🗄️ Database Schema

### `products_wood`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key, auto-increment |
| `name` | STRING | Product name — required |
| `price` | FLOAT | Price in EUR — required |
| `description` | TEXT | Full product description — required |
| `mainCategoryId` | INTEGER | FK → `categories_wood.id` (Level 1) — required |
| `subCategoryId1` | INTEGER | FK → `categories_wood.id` (Level 2) — required |
| `subCategoryId2` | INTEGER \| null | FK → `categories_wood.id` (Level 3) — optional |
| `company` | STRING \| null | Manufacturer / brand text field |
| `features` | JSON | Array of feature strings |
| `image` | TEXT (long) | Base64 thumbnail image |
| `gallery` | JSON | Array of base64 gallery images |
| `isFeatured` | BOOLEAN | Whether product appears on homepage |
| `sku` | STRING \| null | Product SKU code |

### `products_gallery`
Identical schema to `products_wood` but stored in the `products_gallery` table and references `categories_gallery`. Level 3 (`subCategoryId2`) represents the company/brand category.

### `categories_wood`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key, auto-increment |
| `name` | STRING | Category name — required |
| `level` | INTEGER | 1 = Main, 2 = Sub — required |
| `parentId` | INTEGER \| null | References parent category id |

### `categories_gallery`
Same schema as `categories_wood`. Supports 3 levels:
- Level 1 → Main Category
- Level 2 → Subcategory
- Level 3 → Company / Brand (optional)

### `orders`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key, auto-increment |
| `customerName` | STRING | Customer name — required |
| `phone` | STRING | Contact phone — required |
| `paymentMethod` | STRING | `Μετρητά` / `Κάρτα POS` / `Τραπεζική Κατάθεση` — required |
| `documentType` | STRING | `Απόδειξη` / `Τιμολόγιο` — required |
| `specialInstructions` | TEXT \| null | Free-text order notes |
| `fileUrl` | TEXT \| null | Base64-encoded attached file (xlsx / image) |
| `status` | STRING | `Pending` / `Reviewed` / `Completed` — default: `Pending` |

### `admins` (auth table)
Managed by `authController` — stores hashed admin passwords validated against the `ADMIN_PASSPHRASE` env variable. Returns a signed JWT on success.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login with passphrase, receive JWT token |

---

### Wood Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/wood-products` | Public | Retrieve all wood products |
| `GET` | `/api/wood-products/:id` | Public | Retrieve a single wood product by ID |
| `POST` | `/api/wood-products` | 🔐 Admin | Create a new wood product |
| `PUT` | `/api/wood-products/:id` | 🔐 Admin | Update an existing wood product |
| `DELETE` | `/api/wood-products/:id` | 🔐 Admin | Delete a wood product |

---

### Gallery Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/gallery-products` | Public | Retrieve all gallery products |
| `GET` | `/api/gallery-products/:id` | Public | Retrieve a single gallery product by ID |
| `POST` | `/api/gallery-products` | 🔐 Admin | Create a new gallery product |
| `PUT` | `/api/gallery-products/:id` | 🔐 Admin | Update an existing gallery product |
| `DELETE` | `/api/gallery-products/:id` | 🔐 Admin | Delete a gallery product |

---

### Wood Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/wood-categories` | Public | Retrieve all wood categories (all levels) |
| `POST` | `/api/wood-categories` | 🔐 Admin | Create a new category |
| `PUT` | `/api/wood-categories/:id` | 🔐 Admin | Update a category |
| `DELETE` | `/api/wood-categories/:id` | 🔐 Admin | Delete a category |

---

### Gallery Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/gallery-categories` | Public | Retrieve all gallery categories (all levels) |
| `POST` | `/api/gallery-categories` | 🔐 Admin | Create a new category |
| `PUT` | `/api/gallery-categories/:id` | 🔐 Admin | Update a category |
| `DELETE` | `/api/gallery-categories/:id` | 🔐 Admin | Delete a category |

---

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/orders` | **Public** | Submit a new customer order |
| `GET` | `/api/orders` | 🔐 Admin | Retrieve all orders |
| `PUT` | `/api/orders/:id` | 🔐 Admin | Update order status |
| `DELETE` | `/api/orders/:id` | 🔐 Admin | Delete an order |

> **Note on POST /api/orders:** This route is intentionally public — customers do not need to authenticate to submit orders. Admin-only routes require the `Authorization: Bearer <token>` header.

---

## 🔐 Authentication

The API uses **JWT-based authentication** for all admin operations.

**Login flow:**
```
POST /api/auth/login
Body: { "passphrase": "your_secure_passphrase" }
→ Returns: { "token": "<jwt_token>" }
```

**Using the token:**
```
Authorization: Bearer <jwt_token>
```

Tokens are verified by the `verifyToken` middleware (`src/middleware/authMiddleware.ts`) on all protected routes.

---

## 📁 Project Structure

```
backend/
├── api/
│   └── index.ts              # Vercel serverless entry point
├── src/
│   ├── app.ts                # Express app setup, middleware, route registration
│   ├── server.ts             # Local development server startup
│   ├── sequelize.ts          # Sequelize instance (Neon PostgreSQL connection)
│   ├── models/
│   │   ├── productWoodModel.ts     # Wood product Sequelize model
│   │   ├── productGalleryModel.ts  # Gallery product Sequelize model
│   │   ├── categoryWoodModel.ts    # Wood category model (levels 1-2)
│   │   ├── categoryGalleryModel.ts # Gallery category model (levels 1-3)
│   │   └── orderModel.ts           # Customer order model
│   ├── controllers/
│   │   ├── productWoodController.ts
│   │   ├── productGalleryController.ts
│   │   ├── categoryWoodController.ts
│   │   ├── categoryGalleryController.ts
│   │   ├── orderController.ts
│   │   └── authController.ts
│   ├── routes/
│   │   ├── productWoodRoutes.ts
│   │   ├── productGalleryRoutes.ts
│   │   ├── categoryWoodRoutes.ts
│   │   ├── categoryGalleryRoutes.ts
│   │   ├── orderRoutes.ts
│   │   └── authRoutes.ts
│   └── middleware/
│       └── authMiddleware.ts     # JWT verification middleware
├── package.json
└── tsconfig.json
```

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/kuriakosant/achaia-wood-api.git
cd achaia-wood-api/backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string and secrets

# 4. Start the development server (with hot reload)
npm run dev
```

The API will be available at `http://localhost:5000`.

Test the health check endpoint:
```bash
curl http://localhost:5000/
# → { "status": "ok", "message": "Achaia Wood Shop API is running successfully on Vercel!" }
```

---

## 🚀 Deployment

This API is deployed as a **Vercel Serverless Function**.

**Entry point:** `api/index.ts` → imports and re-exports the Express app.

**Deploy steps:**
1. Push to `main` branch
2. Vercel automatically detects `api/index.ts` and deploys it as a serverless function
3. The Express app handles all routes under the serverless function

**Database:** [Neon.tech](https://neon.tech) — serverless PostgreSQL. The Sequelize `sync({ alter: true })` call in `app.ts` automatically creates and migrates all tables on every cold start.

> ⚠️ All models **must be imported** in `app.ts` before `sequelize.sync()` is called, otherwise their tables will not be created.

---

## 🔧 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | Full Neon PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret key for signing JWT tokens | ✅ |
| `ADMIN_PASSPHRASE` | The admin login password | ✅ |
| `PORT` | Local development port (default: 5000) | Optional |

Example `.env`:
```env
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
JWT_SECRET=a_very_long_random_secret_string_here
ADMIN_PASSPHRASE=your_secure_admin_password
PORT=5000
```

---

## 📄 License

This project is licensed under a custom license. Users must credit **KYRIAKOS ANTONIADIS** for any use of the software. Commercial use is not permitted without explicit permission.

See `LICENSE` for full details.
