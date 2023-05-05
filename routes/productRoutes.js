import express from 'express';
import formidable from 'express-formidable';
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  getProductImageController,
  getSingleProductController,
  updateProductController,
} from '../controllers/productController.js';

// router object
const router = express.Router();

// add product || POST METHOD
router.post('/add-product', formidable(), addProductController);

// update product || PUT METHOD
router.put('/update-product/:id', formidable(), updateProductController);

// get all products || GET METHOD
router.get('/get-all-products', formidable(), getAllProductsController);

// get single product || GET METHOD
router.get('/get-product/:slug', formidable(), getSingleProductController);

// get image based on product id
router.get('/get-product-image/:pid', formidable(), getProductImageController);

// delete product
router.delete('/delete-product/:pid', formidable(), deleteProductController);

export default router;
