import express from 'express'
import {
  authUser,
  registerUser,
  updateUserProfile
} from '../controllers/UserController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router
  .route('/')
  .post(registerUser)
  .put(protect, updateUserProfile)

export default router
