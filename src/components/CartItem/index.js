import {CartContext} from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItem} = props
  const {dish_id, dish_name, dish_price, dish_currency, dish_image, quantity} =
    cartItem

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onIncrement = () => {
          incrementCartItemQuantity(dish_id)
        }

        const onDecrement = () => {
          decrementCartItemQuantity(dish_id)
        }

        const onRemove = () => {
          removeCartItem(dish_id)
        }

        const totalPrice = dish_price * quantity

        return (
          <li className="cart-item">
            <img src={dish_image} alt={dish_name} className="cart-item-image" />

            <div className="cart-item-details">
              <p className="cart-item-name">{dish_name}</p>

              <div className="quantity-controls">
                <button type="button" onClick={onDecrement}>
                  -
                </button>

                <p>{quantity}</p>

                <button type="button" onClick={onIncrement}>
                  +
                </button>
              </div>

              <p className="cart-item-price">
                {dish_currency} {totalPrice}
              </p>

              <button type="button" onClick={onRemove}>
                Remove
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
