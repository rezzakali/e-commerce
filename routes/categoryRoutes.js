import express from 'express';
import {
  categoriesController,
  categoryController,
  createCategoryController,
  deleteCategoryController,
  getCategoryNameController,
  updateCategoryController,
} from '../controllers/categoryContoller.js';

// router
const router = express.Router();

// create category
router.post('/create-category', createCategoryController);

// get categories
router.get('/categories', categoriesController);

// get category
router.get('/single-category/:slug', categoryController);

// update category
router.put('/update-category/:id', updateCategoryController);

// delete category
router.delete('/delete-category/:id', deleteCategoryController);

// get single category by id
router.get('/get-single-category/:cid', getCategoryNameController);

export default router;
