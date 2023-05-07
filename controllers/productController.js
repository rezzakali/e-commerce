import fs from 'fs';
import slugify from 'slugify';
import productModel from '../models/productModel.js';

// add product
export const addProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;

    const { image } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: 'Product name is require!' });

      case !description:
        return res
          .status(400)
          .send({ message: 'Product description is require!' });

      case !price:
        return res.status(400).send({ message: 'Product price is require!' });

      case !quantity:
        return res
          .status(400)
          .send({ message: 'Product quantity is require!' });

      case !category:
        return res
          .status(400)
          .send({ message: 'Product category is require!' });

      case image && image.size > 2000000:
        return res.status(400).send({
          message:
            'Product image is require and should be less than or equal to 2MB',
        });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: 'Product addedd successfully!',
      product,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;

    const { image } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: 'Product name is require!' });

      case !description:
        return res
          .status(400)
          .send({ message: 'Product description is require!' });

      case !price:
        return res.status(400).send({ message: 'Product price is require!' });

      case !quantity:
        return res
          .status(400)
          .send({ message: 'Product quantity is require!' });

      case !category:
        return res
          .status(400)
          .send({ message: 'Product category is require!' });

      case image && image.size > 2000000:
        return res.status(400).send({
          message:
            'Product image is require and should be less than or equal to 2MB',
        });
    }
    const { id } = req.params;

    const product = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: 'Product updated successfully!',
      product,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};

// get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .limit(20)
      .populate('category')
      // .select('-image')
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
      totalProducts: products.length,
      products,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select('-image')
      .populate('category');
    res.status(200).send({
      success: false,
      message: 'Product fetched successfully!',
      product,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// get product image
export const getProductImageController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select('image');
    if (product.image.data) {
      res.set('Content-type', product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};

// delete proudct || DELETE METHOD
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    await productModel.findByIdAndDelete(pid).select('-image');
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully!',
    });
  } catch (err) {
    res.status(200).send({
      success: false,
      message: err?.message || 'There was a server side error!',
      error: err,
    });
  }
};
