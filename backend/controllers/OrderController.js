import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    cartItems,
    paymentMethod,
    totalPrice,
    taxPrice,
    shippingPrice
  } = req.body
  try {
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      cart: cartItems,
      paymentMethod,
      totalPrice,
      taxPrice,
      shippingPrice
    })
    const createdOrder = await order.save()
    res.status(201).json({ id: createdOrder._id })
  } catch (error) {
    console.log(error)
    res.status(404)
    throw new Error('Nie udało się dodać zamówienia')
  }
})

const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id)
    res.json(order)
  } catch (error) {
    res.status(404)
    throw new Error('Brak zamówienia o podanym indetyfikatorze')
  }
})

export { createOrder, getOrder }
