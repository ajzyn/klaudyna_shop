import express from 'express'
import { getProducts } from '../controllers/ProductController.js'

const router = express.Router()

router.route('/').get(getProducts)

export default router
