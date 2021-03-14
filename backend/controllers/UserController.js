import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import generateToken from '../utlis/genrateToken.js'

//@desc login user
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: token
    })
  } else {
    res.status(401)
    throw new Error('Niepoprawne dane logowania')
  }
})

//@desc register a new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('Podany email jest zajęty')
  }

  const user = new User({
    name,
    password,
    email
  })
  const newUser = await user.save()

  if (newUser) {
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400)
    throw new Error('Niepoprawne dane uzytkownika')
  }
})

//@desc edit a user data
//@route PUT /api/users/profile
//@access public
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    ;(user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email)
    // zeby znów nie haszował hasła
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('Uzytkownik nie znaleziony')
  }
})

//@desc get user details
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Uzytkownik nie znaleziony')
  }
})

//@desc get all users
//@route GET /api/users/all
//@access private admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

//@desc delete user
//@route DELETE /api/users/:id
//@access private admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (user) {
    res.status(204).end()
  } else {
    res.status(404)
    throw new Error('Nie udało się usunąć uzytkownika')
  }
})

//@desc get user by id
//@route GET /api/users/:id
//@access private admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Nie udało się znaleźć uzytkownika')
  }
})

//@desc update user profile
//@route PUT /api/users/:id
//@access private admin
const updateUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Nie udało się znaleźć uzytkownika')
  }
})

// dodaj slug!! mongoose-url-slugs lib do produktow
//https://medium.com/fbdevclagos/how-to-create-unique-urls-in-an-expressjs-and-mongodb-app-78865802902e

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserProfileById
}
