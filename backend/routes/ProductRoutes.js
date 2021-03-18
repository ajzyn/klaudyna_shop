import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/ProductController.js'
import { isAdmin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(protect, isAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

export default router
