import express from 'express'
import asyncHanlder from 'express-async-handler'
import Product from '../models/ProductModel.js'

const app = express()

const getProducts = app.get(
  '/',
  asyncHanlder(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

export { getProducts }
