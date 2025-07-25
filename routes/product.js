const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateProduct, validateProductUpdate } = require('../middleware/validation');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const router = express.Router();

let products = [];

// GET /api/products?category=...&page=...&limit=...
router.get('/', (req, res) => {
  let { category, page = 1, limit = 10 } = req.query;
  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  // Pagination
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page,
    limit,
    products: paginated
  });
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products
router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', validateProductUpdate, (req, res, next) => {
  try {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return next(new NotFoundError('Product not found'));

    products[idx] = { ...products[idx], ...req.body };
    res.json(products[idx]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  products.splice(idx, 1);
  res.status(204).send();
});

// GET /api/products/search?name=...
router.get('/search/name', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Name query required' });
  const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
});

// GET /api/products/stats
router.get('/stats/category', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;