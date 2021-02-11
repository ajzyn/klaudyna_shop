import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

//middlewares
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

//routes
import productRoutes from './routes/ProductRoutes.js'

const app = express()
dotenv.config()

connectDB()
const PORT = process.env.PORT || 5000

//routes
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

//dodaj na końcu middleware do przekierowania do zbudowanej apki react

app.listen(PORT, () =>
  console.log(
    `Server is running on port : ${PORT} on ${process.env.NODE_ENV}`.bold.blue
  )
)
