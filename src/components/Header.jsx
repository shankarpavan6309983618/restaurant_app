// import React from 'react'
import {useCart} from '../context/CartContext'

export default function Header({restaurantName}) {
  const {totalCount} = useCart()
  return (
    <header className="header">
      <div>
        {/* Test expects restaurant name heading with text content as returned value */}
        <h1 data-testid="restaurant-name">{restaurantName || 'Restaurant'}</h1>
        {/* Test expects a paragraph with "My Orders" */}
        <p data-testid="my-orders">My Orders</p>
      </div>

      <div className="header-right">
        <div className="cart-icon" aria-hidden>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6H21L20 12H8L6 6Z"
              stroke="#111"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="19" r="1.5" fill="#111" />
            <circle cx="18" cy="19" r="1.5" fill="#111" />
          </svg>
        </div>
        <div data-testid="cart-count" className="cart-count">
          {totalCount}
        </div>
      </div>
    </header>
  )
}
