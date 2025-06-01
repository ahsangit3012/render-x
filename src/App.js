import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Tournaments from "./pages/Tournaments";
import Booking from "./pages/Booking";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth"; 
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />}   />
      </Routes>
    </>
  );
}

export default App;
