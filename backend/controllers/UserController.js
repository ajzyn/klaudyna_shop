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
      email: updatedUser.email
    })
  } else {
    res.status(404)
    throw new Error('Uzytkownik nie znaleziony')
  }
})

// dodaj slug!! mongoose-url-slugs lib do produktow
//https://medium.com/fbdevclagos/how-to-create-unique-urls-in-an-expressjs-and-mongodb-app-78865802902e

export { authUser, registerUser, updateUserProfile }