import dotenv from 'dotenv'
import colors from 'colors'
import Product from './models/ProductModel.js'
import User from './models/UserModel.js'
import users from './utlis/users.js'
import products from './utlis/products.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const destoryData = async () => {
  try {
    await Product.deleteMany({})
    await User.deleteMany({})
    console.log('Udało się usunąć dane z bazy'.bgGreen)
    process.exit()
  } catch (err) {
    process.exit(1)
    console.error(`Nie udało się usunąć danych. Powód : ${err.message}`.bgRed)
  }
}

const importData = async () => {
  try {
    await Product.deleteMany({})
    await User.deleteMany({})
    const createdUsers = await User.insertMany(users)

    const generatedProducts = products.map(product => ({
      ...product,
      user: createdUsers[1]._id
    }))

    await Product.insertMany(generatedProducts)
    console.log('Udało się wrzucic dane do bazy'.bgGreen.black)
    process.exit()
  } catch (err) {
    process.exit(1)
    console.errror(
      `Nie udało się dodać zmienić danych w bazie. Powód : ${err.message}`.bgRed
        .black
    )
  }
}

if (process.argv[2] === '-d') destoryData()
else importData()
