import {Component} from 'react'

import Header from '../Header'
import Tabs from '../Tabs'
import DishCard from '../DishCard'

import './index.css'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

class Home extends Component {
  state = {
    restaurantData: null,
    activeCategory: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    try {
      const response = await fetch(dishesApiUrl)
      const data = await response.json()

      const restaurant = Array.isArray(data) ? data[0] : data

      const firstCategory = restaurant.table_menu_list[0].menu_category

      this.setState({
        restaurantData: restaurant,
        activeCategory: firstCategory,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)
      this.setState({isLoading: false})
    }
  }

  changeCategory = category => {
    this.setState({activeCategory: category})
  }

  renderDishes = () => {
    const {restaurantData, activeCategory} = this.state

    const menuList = restaurantData.table_menu_list
    const activeMenu = menuList.find(
      each => each.menu_category === activeCategory,
    )

    const dishes = activeMenu.category_dishes

    return (
      <ul className="dishes-list">
        {dishes.map(eachDish => (
          <DishCard key={eachDish.dish_id} dish={eachDish} />
        ))}
      </ul>
    )
  }

  render() {
    const {restaurantData, activeCategory, isLoading} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <>
        <Header restaurantName={restaurantData.restaurant_name} />

        <Tabs
          categories={restaurantData.table_menu_list}
          active={activeCategory}
          onChange={this.changeCategory}
        />

        {this.renderDishes()}
      </>
    )
  }
}

export default Home
