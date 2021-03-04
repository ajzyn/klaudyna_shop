import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    cart: [
      {
        product: {
          ref: 'Product',
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
    paymentMethod: { type: String, required: true },
    totalPrice: { type: String, required: true, default: 0.0 },
    taxPrice: { type: String, required: true, default: 0.0 },
    shippingPrice: { type: String, required: true, default: 0.0 },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
