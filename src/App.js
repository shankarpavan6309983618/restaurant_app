import {useEffect, useState} from 'react'
import {CartProvider} from './context/CartContext'
import Header from './components/Header'
import Tabs from './components/Tabs'
import DishCard from './components/DishCard'

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

        const response = await fetch(url)
        const jsonData = await response.json()

        const payload = Array.isArray(jsonData) ? jsonData[0] : jsonData

        setData(payload)

        const firstCategory =
          payload.table_menu_list && payload.table_menu_list.length > 0
            ? payload.table_menu_list[0].menu_category
            : ''

        setActiveCategory(firstCategory)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    )
  }

  const categories = data?.table_menu_list || []
  const activeObj = categories.find(
    each => each.menu_category === activeCategory,
  )
  const dishes = activeObj?.category_dishes || []

  return (
    <CartProvider>
      <div className="page">
        <Header restaurantName={data.restaurant_name} />

        <Tabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <main>
          <section className="dish-list" role="list">
            {dishes.map(eachDish => (
              <DishCard key={eachDish.dish_id} dish={eachDish} />
            ))}
          </section>
        </main>
      </div>
    </CartProvider>
  )
}

export default App
