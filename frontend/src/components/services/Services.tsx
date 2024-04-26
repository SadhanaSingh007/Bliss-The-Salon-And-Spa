import { useEffect } from "react";
import "./servicesAnimation.scss";
import { useNavigate } from "react-router-dom"; 
import "./servicesAnimation.scss";
import "./services.scss";
import { useServiceContext } from "../../context/serviceContext";
import service from "../../assets/Service1.jpeg";

// const Base_Url = 'http://localhost:6000';
const Services = () => {
    const {
        services,
        loading,
        error,
        fetchServices,
        // addService,
        // removeService,
      } = useServiceContext();
    
      useEffect(() => {
        fetchServices();
      }, []);
    
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBookAppointment = () => {
 
    navigate("/book-appointment");
  };
  
  return (
    <>
      <div className="backgroundAnim">
        <div className="servicebody">
          <div className="serviceheader">
            <div className="header-p">
              <h1>Services </h1>
              <p className="text-on-image animate__fadeInLeftBig">
                Enter our peaceful place. Enjoy personal services and spa
                treatments to refresh your senses. Book now for a break from the
                everyday.
              </p>
            </div>
            <div className="imagediv ">
              <img src={service} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-body">
        <h2>Our Menu</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          services.map((service) => (
            <div className="service-item" key={service._id}>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-content">
                <p className="service-description">{service.description}</p>
                <p className="dash-p">-----------------</p>
                <p className="service-duration">{service.duration}</p>
                <p className="service-price">${service.price}</p>
              </div>
            </div>
          ))}
          <div className="service-button-div">
          <button onClick={handleBookAppointment}>Book Now</button>
          </div>
      </div>
    </>
  );
};

export default Services;
