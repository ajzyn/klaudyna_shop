import jwt from 'jsonwebtoken'
// import dotenv from

const generateToken = id => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: '100000000'
  })
  return token
}

export default generateToken
