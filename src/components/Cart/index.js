import Header from '../Header'
import {CartContext} from '../../context/CartContext'

import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const isCartEmpty = cartList.length === 0

      return (
        <>
          <Header />

          <div className="cart-container">
            {isCartEmpty ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>

                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>

                <ul className="cart-items-list">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.dish_id} cartItem={eachItem} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
