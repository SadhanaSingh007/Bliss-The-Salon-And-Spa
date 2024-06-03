import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
// import { Canvas } from "@react-three/fiber";
// import { Stars } from "@react-three/drei";

import "./about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <img src={logo} alt="" />
        {/* <Canvas>
          <mesh>
            <Stars />
          </mesh>
        </Canvas> */}
      </div>
      <div className="about-content">
        <div className="inner-div-content">
          <h2>Discover your bliss today</h2>
          <p>
            We offer a range of personalized beauty and wellness services
            designed to help you unwind and revitalize. From rejuvenating
            facials to expert haircare, our skilled team is dedicated to
            providing an exceptional experience tailored to your needs.
          </p>
          <p>
            At Bliss, we prioritize your comfort and satisfaction above all
            else.Our serene atmosphere and attentive staff ensure that every
            visit is a moment of pure relaxation. Come experience the blissful
            escape you deserve at Bliss Salon and Spa.
          </p>
          <p>
            We also curate a selection of premium spa products available for
            purchase through our e-commerce platform.
          </p>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact">
          <h1>Come and visit us </h1>
          <p>123 Fake Street Berlin, 10115 Germany</p>
          <div>
            <Link className="contact-link" to="/contact">
              <span> contact us</span>
            </Link>
            <span>|</span>
            <div>
              <span>tel:</span>
              <p className="contact-number">+49 30 000000000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
