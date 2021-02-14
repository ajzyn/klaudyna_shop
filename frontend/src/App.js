import { Button, Container } from 'react-bootstrap'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
//components
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
//scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import './styles/custom.scss'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Container fluid='lg'></Container>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
