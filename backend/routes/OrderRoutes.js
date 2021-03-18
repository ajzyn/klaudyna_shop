import express from 'express'
import {
  createOrder,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  markAsSent
} from '../controllers/OrderController.js'
import { protect, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, isAdmin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').get(protect, isAdmin, markAsSent)

export default router
