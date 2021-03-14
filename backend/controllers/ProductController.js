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

export { getProducts, getProductById }
