import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import Calendar from "react-calendar";
import "./Appointments.scss";
import { useUser } from "../../../context/UserContext.tsx";
import { useServiceContext } from "../../../context/serviceContext.tsx"; 

const Appointment = () => {
  const { services, fetchServices } = useServiceContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [summary, setSummary] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [filteredTimes, setFilteredTimes] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");



  const { user, setUser, token, setToken } = useUser();
  const displayTime = parseInt(selectedTime)
  const actualTime =  displayTime+ 2;

  const time = new Date(selectedDate?.setHours(actualTime)); 
  
  useEffect(() => {
    fetchServices();
  }, []);

  // const handleDateSelect = (date: Date | Date[]) => {
  //   setSelectedDate(date instanceof Date ? date : null);
  // };
  
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHour = parseInt(event.target.value);
    setSelectedTime(selectedHour);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (!selectedDate || !selectedService || !selectedTime) {
        console.error("Please select date, service, and time");
        return;
      }
      
      const selectedServiceObj = services.find(
        (service) => service.title === selectedService
      );
      console.log("this is selectedServiceObj",selectedServiceObj);
      console.log("this is selected service", selectedService);
      if (!selectedServiceObj) {
        console.error("Selected service not found");
        return;
      }
      
      const {price}= selectedServiceObj
      console.log(typeof(price));
      
      const submittedData = {
        service: selectedService,
        startTime: time,
        price:price,
        user: user._id
      };
      
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
      };
      
      const response = await fetch("http://localhost:3020/appointments/book" , config);
  
      if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessage(responseData.message);
        setFilteredTimes(responseData.filteredTimes); 
        setShowPopup(true); 
        return;
      }
      const result = await response.json();
      console.log("Appointment booked successfully:", result);
      setSelectedService("");
      setSelectedTime(0);
      fetchData();
    } catch (error) {
      console.error("Error while booking appointment:", error);
    }
  };
  
  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    try {
      const response = await fetch(`http://localhost:3020/appointments/${user._id}`, config)
      const data = await response.json();
      
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (serviceName) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`http://localhost:3020/appointments/deleteone/${serviceName}`, config);
      
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      
      console.log("Appointment deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error while deleting appointment:", error);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
    const totalPrice = summary.reduce((acc, item) => acc + item.price, 0);
    
    return (
      <>
      <div className="appointment-container">
        <div className="appointment-form">
          <h1>Book an Appointment</h1>
          <form onSubmit={handleSubmit}>
            <div className="div-container">
              <div
                className="calendar-container"
                style={{ overflow: "hidden" }}
                >
                <h3>Select your date for Service:</h3>
                <Calendar onChange={setSelectedDate} value={selectedDate} minDate={new Date()}/>
              </div>
              <div className="service-select-container">
                <h3>Select your Service:</h3>
                <select
                  name="services"
                  id="booking-service"
                  value={selectedService}
                  onChange={handleServiceChange}
                  >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <div className="time-slot">
                  <h3 className="time-slot">
                    Select the time Slot for Service:
                  </h3>
                  <select
                    name="time slot"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    >
                    <option value="">Select a time</option>
                    <option value={10}>10:00 am</option>
                    <option value={11}>11:00 am</option>
                    <option value={12}>12:00 pm</option>
                    <option value={13}>1:00 pm</option>
                    <option value={14}>2:00 pm</option>
                    <option value={15}>3:00 pm</option>
                    <option value={16}>4:00 pm</option>
                    <option value={17}>5:00 pm</option>
                  </select>
                </div>
                <div className="popup-container">
    {showPopup && (
      <div className="popup">
        <div className="popup-content">
          <p>{errorMessage}</p>
           <TiDeleteOutline onClick={handleClosePopup} />
         
        </div>
      </div>
    )}
  </div>
              </div>
            </div>
            <div className="submit-button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="data-div">
          <h2>Summary</h2>

          {summary.map((item, index) => (
 
            <div key={index} className="submitted-data">
              <div className="display-data">
              <p>{index + 1} <span>Service: </span>{item.service}</p>
              <p><span>Date: </span>{new Date(item.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><span>Time: </span>{new Date(new Date(item.startTime).getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p><span>Price: </span>{item.price}€</p>
              </div>
            <div className="delete-button">
            <RiDeleteBin6Line onClick={() => handleDelete(item.service)} />
            </div>
            </div>
          ))}
          {/* Display total price */}
          <div className="total-price">
            <h3>Total Price: {totalPrice}€</h3>
          </div>
          <button className="confirm-button">
            <span> Confirm</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Appointment;
