# Achaia Wood Shop API

This repository contains the backend API for the Achaia Wood Shop, a digital platform for showcasing woodworking products and services. The API is built using Node.js, Express.js, and MongoDB, providing endpoints for managing product data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. **Clone the repository:**
   
   `git clone https://github.com/kuriakosant/achaia-wood-api.git`
   `cd achaia-wood-api/backend`

2. **Install dependencies:**
   `npm install`

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   `MONGO_URI=your_mongo_connection_string`

## Usage

To start the development server, run:
   `npm install`

The server will start on `http://localhost:5000`.

## API Endpoints

The API provides the following endpoints for managing products:

- **GET /api/products**: Retrieve all products.
- **POST /api/products**: Add a new product.

Refer to the following code snippets for implementation details:

- Product Controller: `src/controllers/productController.ts`
- Product Routes: `src/routes/productRoutes.ts`

## Environment Variables

The application requires the following environment variables:

- `MONGO_URI`: MongoDB connection string.

## License

This project is licensed under a custom license. Users must credit KYRIAKOS ANTONIADIS for any use of the software. Commercial use is not permitted without explicit permission.

For more details, refer to the `LICENSE` file.

---
