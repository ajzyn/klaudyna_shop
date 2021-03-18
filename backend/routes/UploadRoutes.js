import express from 'express'
import { protect, isAdmin } from '../middlewares/authMiddleware.js'
import { upload } from '../controllers/UploadController.js'

const router = express.Router()

router.route('/').post(protect, isAdmin, upload)

export default router
