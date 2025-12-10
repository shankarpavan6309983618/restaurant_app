import {createContext, useContext, useMemo, useState} from 'react'

const CartContext = createContext(null)

export function CartProvider({children}) {
  const [counts, setCounts] = useState({})

  const increment = dishId => {
    setCounts(prev => ({...prev, [dishId]: (prev[dishId] || 0) + 1}))
  }

  const decrement = dishId => {
    setCounts(prev => {
      const cur = prev[dishId] || 0
      if (cur <= 0) return prev
      const next = {...prev, [dishId]: cur - 1}
      if (next[dishId] === 0) delete next[dishId]
      return next
    })
  }

  const totalCount = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts],
  )

  return (
    <CartContext.Provider value={{counts, increment, decrement, totalCount}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
