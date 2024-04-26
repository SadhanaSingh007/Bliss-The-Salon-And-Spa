import "./contact.scss";
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="visit-us">
        <h1>VISIT US</h1>
      </div>
      <div className="contact-us">
        <div className="contact-div">
          <h1>Contact us:</h1>
          <p>
            Share your contact details, and we'll be in touch promptly to assist
            you further. Your relaxation journey starts here!
          </p>
          <form action="" className="contact-form">
            <div className="input-div">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input-div">
              <input type="text" placeholder="Phone" />
              <input type="text" placeholder="Email" />
            </div>

            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Enter your query or request here..."
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
        <div className="location-div">
          <h2>LOCATION & OPENING HOURS</h2>
          <p>123 Fake Street Berlin, 10115 Germany</p>
          <p>Sun-Thu: 9:00 - 21:00.</p>
          <p>Fri: 9:00 - 17:00.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
