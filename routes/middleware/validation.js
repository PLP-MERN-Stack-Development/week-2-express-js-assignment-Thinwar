validation.js
const ValidationError = require('../errors/ValidationError');

function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return next(new ValidationError('Invalid product data'));
  }
  next();
}

function validateProductUpdate(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    (name && typeof name !== 'string') ||
    (description && typeof description !== 'string') ||
    (price && typeof price !== 'number') ||
    (category && typeof category !== 'string') ||
    (inStock && typeof inStock !== 'boolean')
  ) {
    return next(new ValidationError('Invalid product update data'));
  }
  next();
}

module.exports = { validateProduct, validateProductUpdate };