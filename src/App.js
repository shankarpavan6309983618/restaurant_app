import {useEffect, useState} from 'react'
import {CartProvider} from './context/CartContext'
import Header from './components/Header'
import Tabs from './components/Tabs'
import DishCard from './components/DishCard'

export default function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok')
        return res.json()
      })
      .then(json => {
        // API returns an array at top-level (per your pasted sample). Normalize:
        const payload = Array.isArray(json) ? json[0] : json
        setData(payload)
        const first =
          (payload.table_menu_list &&
            payload.table_menu_list[0] &&
            payload.table_menu_list[0].menu_category) ||
          null
        setActiveCategory(first)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    )
  if (error)
    return (
      <div className="page">
        <p>Error: {error}</p>
      </div>
    )

  const categories = data.table_menu_list || []
  const active = activeCategory
  const activeObj = categories.find(c => c.menu_category === active)
  const dishes = (activeObj && activeObj.category_dishes) || []

  return (
    <CartProvider>
      <div className="page">
        <Header restaurantName={data.restaurant_name} />
        <Tabs
          categories={categories}
          active={active}
          onChange={setActiveCategory}
        />
        <main>
          <section className="dish-list" role="list">
            {dishes.map(d => (
              <DishCard key={d.dish_id} dish={d} />
            ))}
          </section>
        </main>
      </div>
    </CartProvider>
  )
}
