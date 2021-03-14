import { Button, Container } from 'react-bootstrap'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
//components
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
//scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import './styles/custom.scss'
import ScrollToTop from './components/ScrollToTop'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'

function App() {
  const { userInfo } = useSelector(state => state.userLogin)
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id' component={ProductDetailsScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentMethodScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/products' component={ProductListScreen} />
          <Route path='/admin/users' component={UserListScreen} exact />
          <Route path='/admin/users/:id/edit' component={UserEditScreen} />
          <Route render={() => <Redirect to='/' />}></Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
