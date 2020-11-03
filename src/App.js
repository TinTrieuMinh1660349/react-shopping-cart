import React from "react";
import ProductList from "./data.json";
import Product from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: ProductList.products,
      size: "",
      sort: "",
      cartItems: []
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems })
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item => item._id !== product._id))
    })
  }
  
  filterProducts = (event) => {
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: ProductList.products
      })
    } else {
      this.setState({
        size: event.target.value,
        products: ProductList.products.filter((product) => {
          return (product.availableSizes.indexOf(event.target.value) >= 0);
        })
      })
    }
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: ProductList.products.sort((a, b) => {
        return (
          sort === 'lowest'
            ? a.price > b.price ? 1 : -1
            : sort === 'highest'
              ? a.price < b.price ? 1 : -1
              : a._id > b._id
                ? 1 : -1
        )
      })
    })
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Product
                products={this.state.products}
                addToCart={this.addToCart}></Product>
            </div>
            <div className="sidebar">
              <Cart 
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              ></Cart>
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
