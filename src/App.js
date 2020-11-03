import React from "react";
import ProductList from "./data.json";
import Product from "./components/Products";
class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      products: ProductList.products,
      size: "",
      sort: ""
    }
  }
  
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
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
