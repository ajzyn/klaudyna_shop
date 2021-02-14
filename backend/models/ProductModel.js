import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String
    },
    rating: {
      requied: true,
      type: Number
    },
    comment: String,
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
)

const productSchema = new mongoose.Schema(
  {
    user: {
      requied: true,
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    category: {
      required: true,
      type: String
    },
    countInStock: {
      required: true,
      type: Number,
      default: 0
    },
    price: {
      required: true,
      type: Number,
      default: 0
    },
    rating: {
      default: 0,
      type: Number
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      default: 0
    },
    brand: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
