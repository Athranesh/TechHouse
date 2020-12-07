import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find(keyword);

  res.json(products);
});

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const currentUser = req.params.user;

  const product = await (await Product.findById(req.params.id)).toObject();

  console.log(product.reviews);

  if (product) {
    product.userHasPurchased = !!product.paidForBy.find(
      (user) => user.toString() === currentUser
    );
    product.userHasReceived = !!product.deliveredTo.find(
      (user) => user.toString() === currentUser
    );
    delete product.paidForBy;
    delete product.deliveredTo;

    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  const createdProduct = await Product.create({
    name,
    price,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  });

  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  createReview,
  updateProduct,
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
};
