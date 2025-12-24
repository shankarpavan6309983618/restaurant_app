import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {CartContext} from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {history, restaurantName} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCart = () => {
    history.push('/cart')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartCount} = value

        return (
          <nav className="header">
            <Link to="/" className="restaurant-name-link">
              <h1 data-testid="restaurant-name">{restaurantName}</h1>
            </Link>

            <p>My Orders</p>

            <div className="header-right">
              <button type="button" data-testid="cart" onClick={onClickCart}>
                Cart
              </button>

              <p className="cart-count">{cartCount}</p>

              <button type="button" onClick={onClickLogout}>
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
