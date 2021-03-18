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

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
}
