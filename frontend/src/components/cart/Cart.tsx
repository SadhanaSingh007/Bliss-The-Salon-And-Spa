import React, { useContext, useState, useEffect } from 'react';
import './Cart.scss';
import { CartContext } from '../../context/Cart';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const Base_Url = 'http://localhost:3020';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { cartItems, clearCart, getCartTotal, removeFromCart, addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="cart-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="cart-header">
            <h1>Shopping cart</h1>
          </div>
          <div className="cart-items">
            {cartItems.map((product: Product) => (
              <div className="cart-item" key={product._id}>
                <div className="product-details">
                  <img src={`${Base_Url}/${product.image}`} alt={product.title} />
                  <div>
                    <h2>{product.title}</h2>
                    <button className="remove-button" onClick={() => removeFromCart(product)}>Remove</button>
                  </div>
                </div>
                <div className="price">€{product.price}</div>
                <div className="quantity">
                  <button className='cartProductAddRemove' onClick={() => removeFromCart(product)}>
                    <  FaMinus  />
                  </button>
                  {product.quantity}
                  <button className='cartProductAddRemove' onClick={() => addToCart(product)}>
                    <FaPlus />
                  </button>
                </div>
                <div className="total">€{product.quantity * product.price}</div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h2>Order summary</h2>
            <div className="subtotal">
              <span>Subtotal</span>
              <span>€{getCartTotal()}</span>
            </div>
            <div className="total">
              <span>Total (Inclusive of tax €0.00)</span>
              <span>€{getCartTotal()}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
          </div>
          {!user && <p style={{ color: "white" }}>You need to login first to continue checkout</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
