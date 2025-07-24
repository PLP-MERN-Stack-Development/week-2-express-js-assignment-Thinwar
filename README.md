# Express.js Products API

## Setup

1. Install dependencies:
   ```sh
   git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Thinwar.git
   cd week-2-express-js-assignment-Thinwar

   npm install

2. Copy `.env.example` to `.env` and set your API key.

3. Start the server:
node server.js


## API Endpoints

### Authentication

All `/api/products` routes require an `x-api-key` header.

### Routes

- `GET /api/products`  
  List all products. Supports `category`, `page`, and `limit` query params.

- `GET /api/products/:id`  
  Get a product by ID.

- `POST /api/products`  
  Create a new product.  
  **Body:** `{ name, description, price, category, inStock }`

- `PUT /api/products/:id`  
  Update a product.  
  **Body:** Any subset of product fields.

- `DELETE /api/products/:id`  
  Delete a product.

- `GET /api/products/search/name?name=...`  
  Search products by name.

- `GET /api/products/stats/category`  
  Get product count by category.

### Example Request

```sh
curl -H "x-api-key: your_api_key_here" http://localhost:3000/api/products
