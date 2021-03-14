import express from 'express'
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserProfileById
} from '../controllers/UserController.js'
import { protect, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(registerUser)
  .put(protect, updateUserProfile)

router.route('/login').post(authUser)

router.route('/all').get(protect, isAdmin, getAllUsers)

router.route('/profile/:id').get(protect, getUserProfile)

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserProfileById)

export default router
