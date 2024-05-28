import React from "react";
import { Link } from "react-router-dom";
import "./BookingDetails.scss";
import { useServiceContext } from "../../../../context/serviceContext";

const BookingDetail = () => {
  const { bookingDetail } = useServiceContext();
  const totalAmount = bookingDetail.reduce((total, item) => total + item.price, 0);

  return (
    <div className="wrap-container">
    <div className="booking-details-container">
      <h2>Booking is Confirmed</h2>
      {bookingDetail.map((item:  any, index) => (
        <div key={index} className="booking-detail">
          <p>{index + 1}. Service: {item.service}</p>
  <p>
                      <span>Date: </span>
                      {new Date(item.startTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span>Time: </span>
                      {new Date(
                        new Date(item.startTime).getTime() 
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
          <p>Price: {item.price}€</p>
        </div>
      ))}
      <div className="total-amount">
        <p>Total Amount: {totalAmount}€</p>
      </div>
      <Link to="/services"> 
        <button className="home-button">
          <span>Go Back</span>
        </button>
      </Link>
    </div>
      </div>
  );
};

export default BookingDetail;