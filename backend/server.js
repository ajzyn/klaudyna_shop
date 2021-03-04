import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'

//middlewares
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

//routes
import productRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'

const app = express()
app.use(morgan('tiny'))
app.use(express.json())

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)

app.use(notFound)
app.use(errorHandler)

//dodaj na końcu middleware do przekierowania do zbudowanej apki react

app.listen(PORT, () =>
  console.log(
    `Server is running on port : ${PORT} on ${process.env.NODE_ENV}`.bold.blue
  )
)
