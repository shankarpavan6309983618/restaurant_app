import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import {CartContextProvider} from './context/CartContext'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

const App = () => (
  <BrowserRouter>
    <CartContextProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/login" />
      </Switch>
    </CartContextProvider>
  </BrowserRouter>
)

export default App
