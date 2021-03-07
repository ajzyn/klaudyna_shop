import express from 'express'
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  getAllUsers
} from '../controllers/UserController.js'
import { protect, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/profile/:id').get(protect, getUserProfile)
router
  .route('/')
  .post(registerUser)
  .put(protect, updateUserProfile)
router.route('/all').get(protect, isAdmin, getAllUsers)

export default router
