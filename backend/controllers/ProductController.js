import asyncHanlder from 'express-async-handler'
import Product from '../models/ProductModel.js'

//@desc get all products
//@route GET /api/products
//@access public
const getProducts = asyncHanlder(async (req, res) => {
  //przy filtrowaniu obiektów i sortowaniu ich sprawdzo odincek
  // https://www.youtube.com/watch?v=myrNOnzfk9I&list=PLjHmWifVUNMLjh1nP3p-U0VYrk_9aXVjE&index=8
  const products = await Product.find({})
  res.json(products)
})

//@desc get proucct by id
//@route GET /api/products/:id
//@access public
const getProductById = asyncHanlder(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Nie znaleziono produktu')
  }
})

//@desc delete product by id
//@route DELETE /api/products/:id
//@access private admin
const deleteProduct = asyncHanlder(async (req, res) => {
  const { id } = req.params
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).end()
  } catch (error) {
    res.status(404)
    throw new Error('Nie znaleziono produktu')
  }
})

//@desc update product by id
//@route PUT /api/products/:id
//@access private admin
const updateProduct = asyncHanlder(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (product) {
    ;(product.name = req.body.name || product.name),
      (product.price = req.body.price || product.price),
      (product.brand = req.body.brand || product.brand),
      (product.category = req.body.category || product.category),
      (product.countInStock = req.body.countInStock || product.countInStock),
      (product.description = req.body.description || product.description),
      (product.image = req.body.image || product.image)

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Nie znaleziono produktu')
  }
})

//@desc create product
//@route POST /api/products
//@access private admin
const createProduct = asyncHanlder(async (req, res) => {
  const {
    name,
    price,
    brand,
    category,
    countInStock,
    description,
    image
  } = req.body

  try {
    const product = new Product({
      user: req.user._id,
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      image
    })
    const createdProduct = await product.save()
    res.json(createdProduct)
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

//@desc create new review
//@route POST /api/products/:id/reviews
//@access private
const createReview = asyncHanlder(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Produkt już skomentowany')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.numReviews

    console.log(product)
    await product.save()
    res.status(201).end()
  } else {
    res.status(404)
    throw new Error('Nie znaleziono produktu')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createReview
}
