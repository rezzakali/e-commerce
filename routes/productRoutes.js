import express from 'express';
import formidable from 'express-formidable';
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  getProductImageController,
  getSimilarProductController,
  getSingleProductController,
  productListController,
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

// get single product slug || GET METHOD
router.get('/get-product/:slug', formidable(), getSingleProductController);

// get single product by id || GET METHOD
router.get('/get-single-product/:id', formidable(), getProductController);

// get image based on product id
router.get('/get-product-image/:pid', formidable(), getProductImageController);

// delete product
router.delete('/delete-product/:pid', formidable(), deleteProductController);

// get product list
router.get('/get-product-list', formidable(), productListController);

// get similar products
router.get('/get-similar-products/:pid/:cid', getSimilarProductController);

export default router;
