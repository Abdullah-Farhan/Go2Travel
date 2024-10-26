import { useState } from "react";
import "./App.css";
import AppLayout from "./layout/Applayout.jsx";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.jsx";
import Results from "./pages/Results/Results.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import StripeProvider from "./stripe/Provider/StripeProvider.jsx";
import HotelInfo from "./pages/HotelInfo/HotelInfo.jsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/results",
        element: <Results searchedValue={"United Arab Emirates"} />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "checkout",
        element: (
          <StripeProvider>
            <Checkout />
          </StripeProvider>
        ),
      },
      {
        path: "hotel-info",
        element: <HotelInfo />
      }
    ]
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
