import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Services from "./components/services/Services";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/products";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/Cart";
import { ServiceProvider } from "./context/serviceContext";
import Contact from "./components/contact/Contact";
import Appointment from "./components/services/appointments/Appointments";
import Logout from "./components/logout/Logout";
import CheckoutForm from "./components/checkout/CheckoutForm";
// import OrderDetails from "./components/order/OrderDetails";
import OrderList from "./components/order/OrderList";
// import ThankYou from "./components/thankYou/ThankYou";


function App() {
  return (
    <>
      <CartProvider>
        <ServiceProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book-appointment" element={<Appointment />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/orders" element={<OrderList />} />



            {/* <Route path="/thank-you" element={<ThankYou/>} /> */}
          </Routes>
        </ServiceProvider>
      </CartProvider>
    </>
  );
}

export default App;
