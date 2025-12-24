import {Component} from 'react'
import {CartContext} from '../context/CartContext'

import './DishCard.css'

class DishCard extends Component {
  state = {
    quantity: 0,
  }

  render() {
    const {dish} = this.props
    const {quantity} = this.state

    const {
      dish_id,
      dish_name,
      dish_description,
      dish_price,
      dish_currency,
      dish_image,
      dish_calories,
      dish_Availability,
      addonCat,
    } = dish

    const isAvailable = dish_Availability === true

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onClickIncrement = () => {
            this.setState(prev => ({quantity: prev.quantity + 1}))
          }

          const onClickDecrement = () => {
            if (quantity > 0) {
              this.setState(prev => ({quantity: prev.quantity - 1}))
            }
          }

          const onClickAddToCart = () => {
            addCartItem({...dish, quantity})
          }

          return (
            <li className="dish-item">
              <img src={dish_image} alt={dish_name} className="dish-image" />

              <div className="dish-details">
                <h1 className="dish-name">{dish_name}</h1>

                <p className="dish-price">
                  {dish_currency} {dish_price}
                </p>

                <p className="dish-description">{dish_description}</p>

                <p className="dish-calories">{dish_calories} calories</p>

                {addonCat.length > 0 && (
                  <p className="customizations">Customizations available</p>
                )}

                {!isAvailable && <p className="not-available">Not available</p>}

                {isAvailable && (
                  <div className="quantity-controller">
                    <button type="button" onClick={onClickDecrement}>
                      -
                    </button>

                    <p>{quantity}</p>

                    <button type="button" onClick={onClickIncrement}>
                      +
                    </button>
                  </div>
                )}

                {quantity > 0 && (
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishCard
