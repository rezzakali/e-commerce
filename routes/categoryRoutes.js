import express from 'express';
import {
  categoriesController,
  categoryController,
  createCategoryController,
  deleteCategoryController,
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

export default router;
