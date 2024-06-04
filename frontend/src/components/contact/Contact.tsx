import { useForm, ValidationError } from "@formspree/react";
import "./contact.scss";
import { useEffect, useRef } from "react";

const Contact = () => {
  const [state, handleSubmit] = useForm("myyrorpk");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <div className="contact-container  ">
      <div className="visit-us ">
        <h1>VISIT US</h1>
      </div>
      <div className="contact-us">
        <div className="contact-div">
          <h1>Contact us:</h1>
          <p>
            Share your contact details, and we'll be in touch promptly to assist
            you further. Your relaxation journey starts here!
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="input-div">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
              />
              <ValidationError
                prefix="Firstname"
                field="firstname"
                errors={state.errors}
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
              />
              <ValidationError
                prefix="Lastname"
                field="lastname"
                errors={state.errors}
              />
            </div>
            <div className="input-div">
              <input type="text" name="phone" id="phone" placeholder="Phone" />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
              />
              <input type="text" name="email" id="email" placeholder="Email" />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <textarea
              name="message"
              id="message"
              placeholder="Enter your query or request here..."
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button type="submit">
              <span>Submit</span>
            </button>
          </form>
          {state.succeeded && (
            <div className="success-message">
              <p>Thanks for reaching out! We'll get back to you soon.</p>
            </div>
          )}
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
