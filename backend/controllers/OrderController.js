import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'

//@desc create new order
//@route POST /api/order
//@access private
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

//@desc get order details
//@route GET /api/order/:id
//@access private
const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id).populate('user', 'name email')
    res.json(order)
  } catch (error) {
    res.status(404)
    throw new Error('Brak zamówienia o podanym indetyfikatorze')
  }
})

//@desc update order to paid
//@route PUT /api/order/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id)
    order.isPaid = true
    order.paidAt = Date.now()
    //to dostajemy z paypala
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(404)
    throw new Error('Nie udało się zrealizować płatnośći')
  }
})

//@desc get my orders list
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { createOrder, getOrder, updateOrderToPaid, getMyOrders }