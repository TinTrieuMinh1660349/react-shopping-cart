import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    }
  }

  openModal = (product) => {
    this.setState({
      product
    })
  }

  closeModal = (product) => {
    this.setState({
      product: null
    })
  }

  render() {
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map(product => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button onClick={() => this.props.addToCart(product)} className="button primary">Add to cart</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {this.state.product && (
          <Modal isOpen={true} onRequestClose={!this.state.product}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>x</button>
              <div className="product-details">
                <img src={this.state.product.image} alt={this.state.product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{this.state.product.title}</strong>
                  </p>
                  <p>
                    {this.state.product.description}
                  </p>
                  <p>
                    Avaiable Sizes
                    {this.state.product.availableSizes.map(x => {
                    return <span>{" "}<button className="button">{x}</button></span>
                  })}
                  </p>
                  <p className="product-price">
                    <div>{formatCurrency(this.state.product.price)}</div>
                    <button className="button primary" onClick={() => {
                      this.props.addToCart(this.state.product);
                      this.closeModal();
                    }}>Add to cart</button>
                  </p>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default Products;