import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js';

// create category || POST METHOD
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body.data;
    if (!name) {
      res.status(400).send({ message: 'Category name must be require!' });
    }
    // check exists the same category
    const existsCategory = await categoryModel.findOne({ name });
    if (existsCategory) {
      return res.status(403).send({
        success: false,
        message: 'Category already exists!',
      });
    }
    const newCategory = new categoryModel({ name, slug: slugify(name) });
    await newCategory.save();

    res.status(201).send({
      success: true,
      message: 'Category created successfully!',
      newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// fetch all categories || GET METHOD
export const categoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: 'Categories fetched successfully!',
      categories,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// fetch single category || GET METHOD
export const categoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const catergory = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: 'Category fetched successfully!',
      catergory,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
    });
  }
};

// update category || PUR METHOD
export const updateCategoryController = async (req, res) => {
  try {
    const { data: name } = req.body;

    const { id } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Category updated successfully!',
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!',
      error: err,
    });
  }
};

// delete category || DELETE METHOD
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: 'Category deleted successfully!',
      category: deletedCategory,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// get product category (single product) || GET METHOD
export const getCategoryNameController = async (req, res) => {
  try {
    const { cid } = req.params;

    const category = await categoryModel.findById({ _id: cid });
    res.status(200).send({
      success: true,
      message: 'Success',
      category,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};
