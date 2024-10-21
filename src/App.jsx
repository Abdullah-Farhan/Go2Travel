import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.jsx";
import Results from "./pages/Results/Results.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import StripeProvider from "./stripe/Provider/StripeProvider.jsx";
import HotelInfo from "./pages/HotelInfo/HotelInfo.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/results"
          element={
            <Results searchedValue={"United Arab Emirates"} searchedResults={3921} />
          }
        />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/checkout" element={
          <StripeProvider>
          <Checkout />
        </StripeProvider>}/>
        <Route path="/hotel-info" element={<HotelInfo />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
