import React from "react";
import ProductList from "./data.json";
import Product from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: ProductList.products,
      size: "",
      sort: ""
    }
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
              <Product products={this.state.products}></Product>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
