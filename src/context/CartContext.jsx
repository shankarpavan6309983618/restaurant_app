import {createContext, Component} from 'react'

const CartContext = createContext()

class CartContextProvider extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(
      eachItem => eachItem.dish_id === product.dish_id,
    )

    if (existingItem === undefined) {
      const updatedProduct = {...product, quantity: 1}
      this.setState(prevState => ({
        cartList: [...prevState.cartList, updatedProduct],
      }))
    } else {
      this.incrementCartItemQuantity(product.dish_id)
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachItem => eachItem.dish_id !== dishId,
    )
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.dish_id === dishId
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const product = cartList.find(eachItem => eachItem.dish_id === dishId)

    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem =>
          eachItem.dish_id === dishId
            ? {...eachItem, quantity: eachItem.quantity - 1}
            : eachItem,
        ),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  getCartCount = () => {
    const {cartList} = this.state
    return cartList.reduce((total, eachItem) => total + eachItem.quantity, 0)
  }

  render() {
    const {children} = this.props
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          cartCount: this.getCartCount(),
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export {CartContext, CartContextProvider}
