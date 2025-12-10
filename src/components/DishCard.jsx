// import React from 'react'
import {useCart} from '../context/CartContext'

export default function DishCard({dish}) {
  const {counts, increment, decrement} = useCart()

  const id = dish.dish_id
  const qty = counts[id] || 0

  const name = dish.dish_name || ''
  const desc = dish.dish_description || ''
  const calories = dish.dish_calories || ''
  const price = dish.dish_price ?? ''
  const currency = dish.dish_currency || ''
  const image = dish.dish_image || ''

  // Handle dish availability safely without nested ternaries
  const availability = dish.dish_Availability ?? dish.dish_availability ?? true

  const addons = dish.addonCat || dish.addoncat || []
  const hasAddons = Array.isArray(addons) && addons.length > 0
  const available = availability === true || availability === 'true'

  return (
    <article className="dish-card" data-testid={`dish-${name}`}>
      <img
        src={image}
        alt={name}
        className="dish-image"
        data-testid={`image-${id}`}
      />

      <div className="dish-body">
        <h3>{name}</h3>

        <p className="dish-desc" data-testid={`desc-${id}`}>
          {desc}
        </p>

        <p className="dish-price" data-testid={`price-${id}`}>
          {currency} {price}
        </p>

        <p className="dish-cal" data-testid={`cal-${id}`}>
          {calories} calories
        </p>

        {hasAddons && (
          <p data-testid="customizations" className="custom">
            Customizations available
          </p>
        )}

        {!available && (
          <p data-testid="not-available" className="not-available">
            Not available
          </p>
        )}
      </div>

      <div className="qty-controls">
        {available ? (
          <>
            <button
              type="button"
              className="qty-btn"
              onClick={() => decrement(id)}
              data-testid={`decrement-${id}`}
            >
              -
            </button>

            <div className="qty" data-testid={`qty-${id}`}>
              {qty}
            </div>

            <button
              type="button"
              className="qty-btn"
              onClick={() => increment(id)}
              data-testid={`increment-${id}`}
            >
              +
            </button>
          </>
        ) : (
          <div className="dash">—</div>
        )}
      </div>
    </article>
  )
}
