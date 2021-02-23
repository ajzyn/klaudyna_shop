import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      //sprawdzic czy token nie wygasl
      //sprawdzic dalczego nie dzialaja mi hadnle errory przy zlym tokenie, albo w akcji sie zle zapisuje zwrotka - ale i tak servver sie wysypuje wtedy cos jest nie tak
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
}
