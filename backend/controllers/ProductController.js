import express from 'express'
import asyncHanlder from 'express-async-handler'
import Product from '../models/ProductModel.js'

const app = express()

const getProducts = asyncHanlder(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

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
