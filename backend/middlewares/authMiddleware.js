import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(decoded._id).select('-password')

      req.user = user
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Błąd autoryzacji. Token niepoprawny')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Błąd autoryzacji. Brak tokena')
  }
})

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Brak odpowiednich uprawnień')
  }
})
