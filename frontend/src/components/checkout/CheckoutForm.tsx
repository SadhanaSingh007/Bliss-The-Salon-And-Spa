// CheckoutForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.scss';
import { FaPaypal, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';

interface FormState {
  email: string;
  fullName: string;
  telephone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  paymentMethod: 'paypal' | 'creditCard' | 'debitCard';
}

const CheckoutForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    fullName: '',
    telephone: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
    paymentMethod: 'paypal',
  });
  const [isCheckoutComplete, setIsCheckoutComplete] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { email, fullName, telephone, address, city, country, postcode } = formState;
    // Check if telephone number has exactly 10 digits
    const isValidTelephone = telephone.match(/^\d{10}$/);
    return email && fullName && isValidTelephone && address && city && country && postcode;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      console.log("Checking out...", formState);
      setIsCheckoutComplete(true); // Assume checkout is successful for demonstration
    } else {
      alert("Please ensure all fields are correctly filled. Telephone must be exactly 10 digits.");
    }
  };

  return (
    <div className="checkout-form-container">
      {isCheckoutComplete ? (
        <div className="thank-you-message">
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been placed and is being processed. Please review or update your contact information below.</p>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
            <button onClick={() => navigate('/')}>Finalize Order</button>
          </form>
        </div>
      ) : (
        <form className="checkout-form">
          <div className="contact-info">
            <label htmlFor="email">Contact</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="test211@test.com"
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="shipping-info">
            <div className="full-name">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full name"
                value={formState.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="telephone">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                placeholder="1234567890"
                value={formState.telephone}
                onChange={handleInputChange}
              />
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formState.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="city">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formState.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="country">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formState.country}
                onChange={handleInputChange}
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AUS">Australia</option>
                <option value="IND">India</option>
                <option value="GER">Germany</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
                <option value="FRA">France</option>
                <option value="ITA">Italy</option>
              </select>
            </div>
            <div className="postcode">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Postcode"
                value={formState.postcode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="payment-method">
            <label>Payment Method</label>
            <div>
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={formState.paymentMethod === 'paypal'}
                onChange={handleInputChange}
              />
              <label htmlFor="paypal"><FaPaypal /> PayPal</label>
            </div>
            <div>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                checked={formState.paymentMethod === 'creditCard'}
                onChange={handleInputChange}
              />
              <label htmlFor="creditCard"><FaCreditCard /> Credit Card</label>
            </div>
            <div>
              <input
                type="radio"
                id="debitCard"
                name="paymentMethod"
                value="debitCard"
                checked={formState.paymentMethod === 'debitCard'}
                onChange={handleInputChange}
              />
              <label htmlFor="debitCard"><FaMoneyCheckAlt /> Debit Card</label>
            </div>
          </div>
          <button
            type="button"
            className="continue-button"
            onClick={handleCheckout}
          >
            Continue to payment
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
