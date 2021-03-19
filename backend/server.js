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
import uploadRoutes from './routes/UploadRoutes.js'

const app = express()

dotenv.config()
connectDB()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

app.use(express.json())

const PORT = process.env.PORT || 5000

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

//dodaj na końcu middleware do przekierowania do zbudowanej apki react

app.listen(PORT, () =>
  console.log(
    `Server is running on port : ${PORT} on ${process.env.NODE_ENV}`.bold.blue
  )
)
