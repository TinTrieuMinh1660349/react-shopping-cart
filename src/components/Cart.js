import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: ""
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createOrder = (e) => {
    e.preventDefault();
    const orderInfo = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    }
    //Send to function createOrder in parent component
    this.props.createOrder(orderInfo);
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div>
          {cartItems.length === 0
            ? <div className="cart cart-header">Cart is empty</div>
            : <div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>
          }
        </div>
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button className="button remove" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "} {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                </div>
                <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Process</button>
              </div>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <Fade right>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input name="email" type="email" required onChange={this.handleInput}></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input name="name" type="text" required onChange={this.handleInput}></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input name="address" type="text" required onChange={this.handleInput}></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">Checkout</button>
                      </li>
                    </ul>
                  </Fade>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Cart;