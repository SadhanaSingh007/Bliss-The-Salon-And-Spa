import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.svg";

const App = () => {
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const currentPageRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const [wheelEnabled, setWheelEnabled] = useState(true);
  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    showInitialPage();
  }, []);

  const showInitialPage = () => {
    pagesRef.current.forEach((page) => {
      page.classList.remove("active");
      page.classList.add("inactive");
    });
    pagesRef.current[currentPageRef.current].classList.add("active");
    pagesRef.current[currentPageRef.current].classList.remove("inactive");
  };

  const checkLast = (direction: number) => {
    if (
      direction === 1 &&
      currentPageRef.current === pagesRef.current.length - 1
    ) {
      isTransitioningRef.current = false;
      return true;
    }
    if (direction === -1 && currentPageRef.current === 0) {
      isTransitioningRef.current = false;
      return true;
    }
    return false;
  };

  const scrollToSection = (direction: number) => {
    setTimeout(() => {
      setWheelEnabled(() => true);
    }, 1000); // after 2 second (can be changed), enable the scroll again
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    if (checkLast(direction)) {
      return;
    }

    pagesRef.current[currentPageRef.current].style.transform = `translateY(${
      direction * -100
    }vh)`;
    const previousPage = currentPageRef.current;

    currentPageRef.current =
      (currentPageRef.current + pagesRef.current.length + direction) %
      pagesRef.current.length;

    pagesRef.current[previousPage].classList.remove("active");
    pagesRef.current[previousPage].classList.add("inactive");
    pagesRef.current[currentPageRef.current].classList.add("active");
    pagesRef.current[currentPageRef.current].classList.remove("inactive");
    pagesRef.current[currentPageRef.current].style.transform = "translateY(0)";

    isTransitioningRef.current = false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const direction = Math.sign(event.deltaY); // either 1 or -1 depending on scroll direction
    setWheelEnabled(() => false); // cant run scroll multiple times
    scrollToSection(direction);
  };

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      setStartY(touch.clientY);
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    setStartY(null);
  }, []);

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (startY === null) return;

    const touch = event.touches[0];
    const currentY = touch.clientY;
    const deltaY = startY - currentY;

    console.log("Scroll delta:", deltaY);
    console.log(Math.sign(deltaY));

    // You can handle the scroll logic here

    setStartY(currentY); // Update the startY for the next move event
    const direction = Math.sign(deltaY); // either 1 or -1 depending on scroll direction
    setWheelEnabled(() => false); // cant run scroll multiple times
    scrollToSection(direction);
  };

  return (
    <div
      className="hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={wheelEnabled ? handleTouchMove : undefined}
      onWheel={wheelEnabled ? handleWheel : undefined}
    >
      <div
        className="page page1"
        style={{
          transform: "translateY(0px)",
          transition: "transform ease-out 1s",
        }}
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 1) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page2"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 2) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="about inner-page-div service-home">
          <h3>Indulge in well-deserved pampering today!</h3>
          <p>
            At Bliss, we are passionate about providing you with the ultimate
            salon and spa experience.
          </p>
          <p>Click here to book your salon and spa services now </p>
          <Link to="services">
            <span>Book Now</span>
          </Link>
        </div>
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page3"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 3) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="about inner-page-div product-home">
          <h3> Discover our exclusive range of salon and spa products</h3>
          <p>
            Carefully curated to complement your beauty and wellness routine. At
            Bliss, we believe in using only the finest ingredients to ensure the
            best results for our clients.
          </p>
          <Link to="products">
            <span>Explore our Products</span>
          </Link>
        </div>
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page4"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 4) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="about inner-page-div">
          <h3>
            Step into Bliss Salon and Spa, your haven of tranquility in Berlin.
          </h3>
          <p>
            We offer a range of personalized beauty and wellness services
            designed to help you unwind and revitalize. From.....
          </p>

          <Link to="/about ">
            <span>More About us</span>
          </Link>
        </div>
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page5"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 5) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="about inner-page-div">
          <img src={logo} alt="bliss-logo" className="bliss-logo" />
          <h3>Visit us </h3>
          <p>123 Fake Street Berlin, 10115 Germany</p>
          <div>
            <h3>Or</h3>
            <Link className="contact-link" to="/contact">
              <span> Contact us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
