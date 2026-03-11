# Achaia Wood Shop API

This repository contains the backend API for the Achaia Wood Shop, a digital platform for showcasing woodworking products and services. The API is built using Node.js, Express.js, and **PostgreSQL** (via Sequelize ORM), providing secure endpoints for managing product data.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Deployment (Free)](#deployment-free)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features
- **PostgreSQL Integration:** Powered by Sequelize ORM for robust and relational product data storage.
- **Secure Admin Portal:** Uses JWT (JSON Web Tokens) and a static passphrase to lock Admin endpoints without complex RBAC.
- **Full CRUD:** Create, Read, Update, and Delete woodworking products dynamically.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kuriakosant/achaia-wood-api.git
   cd achaia-wood-api/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add your PostgreSQL connection string and secrets:
   ```env
   DATABASE_URL=your_neon_postgres_connection_string
   ADMIN_PASSPHRASE=your_secure_admin_password
   JWT_SECRET=your_random_long_secret_string
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

## Deployment (Free)

This API is designed to be hosted for free on **Render**. 
1. Link this repository to Render as a Web Service.
2. Set the Root Directory to `backend`.
3. Set Build Command to `npm install && npm run build`.
4. Set Start Command to `npm start`.
5. Add the Environment Variables (`DATABASE_URL`, `ADMIN_PASSPHRASE`, `JWT_SECRET`) directly in the Render dashboard.

*(Recommended: Use Neon.tech for a free Serverless PostgreSQL database to use as your `DATABASE_URL`)*.

## API Endpoints

### Public
- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve a specific product by ID.

### Admin Only (Requires Header: `Authorization: Bearer <token>`)
- **POST /api/auth/login**: Authenticate using `passphrase` to receive a JWT.
- **POST /api/products**: Add a new product.
- **PUT /api/products/:id**: Edit an existing product.
- **DELETE /api/products/:id**: Delete an existing product.

## Environment Variables

The application requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string (e.g., from Neon).
- `ADMIN_PASSPHRASE`: The secure password required to log into the Admin portal.
- `JWT_SECRET`: A secure random string used to sign session cookies.

## License

This project is licensed under a custom license. Users must credit KYRIAKOS ANTONIADIS for any use of the software. Commercial use is not permitted without explicit permission.

For more details, refer to the `LICENSE` file.
