import React, { useState } from "react";
import search from "../../assets/svg/lens.svg";
import schedule from "../../assets/svg/schedule.svg";
import guest from "../../assets/svg/guest.svg";
import maps from "../../assets/svg/maps.svg";
import star from "../../assets/svg/star.svg";
import leafFilled from "../../assets/svg/leafFilled.svg";
import leaf from "../../assets/svg/leaf.svg";
import heart from "../../assets/svg/heart.svg";
import connect from "../../assets/svg/connect.svg";
import checkbox from "../../assets/svg/checkbox.svg";
import loc from "../../assets/svg/location.svg";
import jood from "../../assets/svg/jood.svg";

import { useLocation, useNavigate } from "react-router-dom";

const HotelInfo = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("overview");
  const [searchedPlace, setSearchedPlace] = useState("Dubai");
  const location = "United Arab Emirates";
  const searchFilter = {
    adult: 1,
    children: 0,
    rooms: 1,
  };
  const nights = 5;

  const date = {
    checkin: "Monday, Oct 2, 2023",
    checout: "Saturday, Oct 6, 2023",
  };

  let { state } = useLocation();
  if (!state) {
    state = {
      hotel: {
        name: "Jood Hotel Apartments",
        location: "Deria, Dubai",
        image: jood,
        mapsLink: "https://maps.app.goo.gl/rcBWo3V5VqfETFEJ6",
        level: 1,
        costPerNight: 23786,
        tax: Math.round(10000 * 0.025),
        prePayment: true,
        cancelation: true,
        bookWithoutCard: true,
        beach: true,
        hotel: false,
        rating: 4,
        resort: false,
        guestHouse: false,
        sustainability: true,
        fitness: false,
        bars: true,
        mall: false,
        cinema: true,
        spa: true,
        reviews: 7.9,
        type: "Delux Three Bedroom Apartment",
        guestReviews: 579,
      },
    };
  }

  const handleLinkClick = (link, event) => {
    event.preventDefault();
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-[954px]">
        {/* Header */}
        <div className="w-full flex justify-start flex-col md:flex-row">
          <p className="text-custom-gold">
            Home &gt; {location} &gt; search results{" "}
            <span className="text-custom-green">&gt; {state.hotel.name}</span>
          </p>
        </div>
        {/* Links */}
        <div className="">
          <ul className="flex flex-wrap">
            <li className="group mr-7">
              <a href="" onClick={(event) => handleLinkClick("flight", event)}>
                <p className="font-medium mb-1 text-custom-green">Overview</p>
                <span
                  className={`block h-[2px] bg-[#4F5831] left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    activeLink === "overview" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
            <li className="group mr-7">
              <a href="" onClick={(event) => handleLinkClick("info", event)}>
                <p className="font-medium mb-1 text-custom-green">
                  Info & Prices
                </p>
                <span
                  className={`block h-[2px] bg-[#4F5831] left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    activeLink === "info" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
            <li className="group mr-7">
              <a
                href=""
                onClick={(event) => handleLinkClick("facilities", event)}
              >
                <p className="font-medium mb-1 text-custom-green">Facilities</p>
                <span
                  className={`block h-[2px] bg-[#4F5831] left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    activeLink === "facilities" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
            <li className="group mr-7">
              <a href="" onClick={(event) => handleLinkClick("rules", event)}>
                <p className="font-medium mb-1 text-custom-green">
                  House Rules
                </p>
                <span
                  className={`block h-[2px] bg-[#4F5831] left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    activeLink === "rules" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
            <li className="group">
              <a
                href="#guestReviews"
                onClick={(event) => handleLinkClick("reviews", event)}
              >
                <p className="font-medium mb-1 text-custom-green">
                  Guest Reviews ({state.hotel.guestReviews})
                </p>
                <span
                  className={`block h-[2px] bg-[#4F5831] left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    activeLink === "reviews" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
          </ul>
        </div>

        <span className="w-full h-0.5 bg-custom-green block mt-3"></span>
        {/* Content */}
        <div className="w-full mt-4 flex flex-col md:flex-row">
          {/* Search Feature */}
          <div className="border rounded border-custom-gold w-full md:w-[30%] p-2 px-4">
            <p className="text-custom-green text-xl font-bold">Search</p>
            <p className="text-[10px] text-custom-green">
              Destination / property name
            </p>
            <div className="flex w-[97%] shadow-search mt-2 py-1 px-2 rounded">
              <img className="w-4 h-4" src={search} />
              <input
                type="text"
                value={searchedPlace}
                className="ml-4 text-[10px] font-medium text-custom-green w-full"
              />
            </div>
            <p className="mt-2 text-[10px] text-custom-green">Check-in date</p>
            <div className="flex w-[97%] shadow-search mt-2 py-1 px-2 rounded">
              <img className="w-4 h-4" src={schedule} />
              <input
                type="text"
                value={date.checkin}
                className="ml-4 text-[10px] font-medium text-custom-green w-full"
              />
            </div>
            <p className="mt-2 text-[10px] text-custom-green">Check-out date</p>
            <div className="flex w-[97%] shadow-search mt-2 py-1 px-2 rounded">
              <img className="w-4 h-4" src={schedule} />
              <input
                type="text"
                value={date.checout}
                className="ml-4 text-[10px] font-medium text-custom-green w-full"
              />
            </div>
            <p className="mt-2 text-[10px] text-custom-green">
              {nights} nights stay
            </p>
            <div className="flex w-[97%] shadow-search mt-2 py-1 px-2 rounded">
              <img className="w-4 h-4" src={guest} />
              <input
                type="text"
                value={`${searchFilter.adult} adults | ${searchFilter.children} children | ${searchFilter.rooms} rooms`}
                className="ml-4 text-[10px] font-medium text-custom-green outline-none"
              />
            </div>
            <div className="w-full flex justify-center mt-5">
              <button className="text-white bg-custom-green px-6 py-1 justify-center text-medium text-xl rounded">
                Search
              </button>
            </div>
            <div className="mt-2 flex w-full justify-center">
              <a href={`${state.hotel.mapsLink}`}>
                <img src={maps} />
              </a>
            </div>
          </div>

          {/* Images  */}
          <div className="w-full ml-5">
            <div className="flex items-center flex-col md:flex-row">
              <div className="w-20 flex border-r border-r-[#4F5831]">
                {Array(state.hotel.rating)
                  .fill(0)
                  .map((_, index) => (
                    <img
                      key={index}
                      src={star}
                      alt="rating"
                      className="w-4 h-4"
                    />
                  ))}
              </div>
              <div className="w-full flex md:flex-row flex-col">
                <div className="ml-2 flex items-center">
                  {Array(state.hotel.level)
                    .fill(0)
                    .map((_, index) => (
                      <img
                        key={index}
                        src={leafFilled}
                        alt="sustainability level"
                        className="w-4 h-4"
                      />
                    ))}
                  {Array(3 - state.hotel.level)
                    .fill(0)
                    .map((_, index) => (
                      <img
                        key={index}
                        src={leaf}
                        alt="sustainability level"
                        className="w-4 h-4"
                      />
                    ))}
                  <p className="text-custom-gold ml-2">
                    Travel sustainable level {state.hotel.level}
                  </p>
                </div>
                <div className="flex flex-grow md:justify-end">
                  <img src={heart} alt="" />
                  <img src={connect} alt="" className="mx-2" />
                  <button className="font-medium text-white text-xl  rounded bg-custom-green px-4 py-1" onClick={()=>navigate("/payment", { state })}>
                    Reserve
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-custom-green font-extrabold text-xl mb-[-10px]">
                {state.hotel.name}
              </p>
              <a
                href={state.hotel.mapsLink}
                className="underline text-custom-green text-[10px]"
              >
                {state.hotel.location}
              </a>
            </div>

            <div className="w-full h-96">
            <img src={jood} className="w-full h-full bg-cover"/>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col mt-3">
          <div className="flex md:w-3/4 w-full flex-col pr-2">
            <p className="font-bold text-custom-green mb-4">
              Get the celebrity treatment with world-class service at Jood Hotel
              Apartments
            </p>
            <p>
              Located in Dubai, 3.7 miles from Grand Mosque, Jood Hotel
              Apartments provides accommodations with an outdoor swimming pool,
              free private parking, a fitness center and a terrace. Each room at
              the 5-star hotel has city views, and guests can enjoy access to a
              sauna and a hot tub. The property has a concierge service, a tour
              desk and currency exchange for guests.
            </p>
            <br/>
            <p>
              At the hotel all rooms come with air conditioning, a seating area,
              a flat-screen TV with satellite channels, a kitchen, a dining
              area, a safety deposit box and a private bathroom with a bidet,
              free toiletries and a hairdryer. Free WiFi is available to all
              guests, while selected rooms here will provide you with a balcony.
              At Jood Hotel Apartments the rooms include bed linen and towels.
            </p>
          </div>

          <div className="flex md:w-1/4 w-full shadow-result items-center flex-col p-2">
            <p className="text-custom-green font-bold text-center">
              Property Highlights
            </p>
            <div className="w-full">
              <p className="text-custom-green text-[13px] my-3 font-semibold">
                Perfect for {nights} night stay
              </p>
              <div className="flex items-center">
                <img src={loc} />
                <p className="font-medium text-[10px] text-custom-green ml-2">
                  Top Location: Highly rated by recent guests
                </p>
              </div>
              <p className="text-custom-green text-[13px] my-3 font-semibold">Rooms with</p>
              <div className="flex flex-row w-full items-center">
                <img src={checkbox} />
                <p className="ml-3 text-[10px] text-custom-green">Terrace</p>
              </div>
              <div className="flex flex-row w-full items-center my-3">
                <img src={checkbox} />
                <p className="ml-3 text-[10px] text-custom-green">City View</p>
              </div>
              <div className="flex flex-row w-full items-center">
                <img src={checkbox} />
                <p className="ml-3 text-[10px] text-custom-green">Free private parking available at hotel</p>
              </div>
            </div>
            <button className="font-medium text-xl text-white bg-custom-green rounded py-1 px-3 mt-7 mb-3" onClick={()=>navigate("/payment", { state })}>Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
