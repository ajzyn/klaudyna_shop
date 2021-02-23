import { Button, Container } from 'react-bootstrap'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
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

function App() {
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
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
