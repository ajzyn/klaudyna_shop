import express from 'express'
import { createOrder, getOrder } from '../controllers/OrderController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrder)

export default router
