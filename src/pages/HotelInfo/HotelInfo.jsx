import React, { useState, useEffect, useContext } from "react";
import search from "../../assets/svg/lens.svg";
import schedule from "../../assets/svg/Schedule.svg";
import guests from "../../assets/svg/guest.svg";
import maps from "../../assets/svg/maps.svg";
import star from "../../assets/svg/star.svg";
import leafFilled from "../../assets/svg/leafFilled.svg";
import leaf from "../../assets/svg/leaf.svg";
import heart from "../../assets/svg/heart.svg";
import connect from "../../assets/svg/connect.svg";
import checkbox from "../../assets/svg/checkbox.svg";
import loc from "../../assets/svg/location.svg";
import jood from "../../assets/svg/jood.svg";
import steam from "../../assets/svg/steam.svg";
import swimming from "../../assets/svg/swimming.svg";
import transport from "../../assets/svg/transport.svg";
import smoking from "../../assets/svg/smoking.svg";
import nosmoke from "../../assets/svg/nosmoke.svg";
import hours from "../../assets/svg/hours.svg";
import fitness from "../../assets/svg/fitness.svg";
import uae from "../../assets/svg/uae.svg";
import available from "../../assets/svg/available.svg";
import bell from "../../assets/svg/bell.svg";
import { useLocation, useNavigate } from "react-router-dom";
import TopAccomodation from "../../Cards/TopAccomodation";
import { GuestContext } from "../../Context/GuestContext";
import { DateContext } from "../../Context/DateContext";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css";

const HotelInfo = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("overview");
  const [searchedPlace, setSearchedPlace] = useState("Dubai");
  const location = "United Arab Emirates";
  const { guest } = useContext(GuestContext);
  const { selectedDates } = useContext(DateContext);
  const [checkInDate, setCheckInDate] = useState(
    selectedDates ? selectedDates[0] : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    selectedDates ? selectedDates[1] : null
  );
  const [nights, setNights] = useState(0);
  const [searchFilter, setSearchFilter] = useState({
    adults: guest ? guest.adults : 1,
    children: guest ? guest.children : 0,
    rooms: guest ? guest.rooms : 1,
  });
  

  const questions = Array(9).fill("Where to park?");

  const nearbyInfo = {
    "What's nearby": [
      { name: "Deira Clock Tower", distance: "600 m" },
      { name: "Union Metro East Exit Park", distance: "850 m" },
      { name: "park deira dubai", distance: "1,000 m" },
      { name: "The Floating Bridge", distance: "1.4 km" },
      { name: "Al Bastakiya", distance: "2.1 km" },
      { name: "Creek Park", distance: "2.2 km" },
      { name: "Dubai Museum", distance: "2.4 km" },
      { name: "Karama Park", distance: "2.4 km" },
      { name: "Heritage Village", distance: "3.2 km" },
      { name: "Saeed Al Maktoum House", distance: "3.2 km" },
    ],
    "Top attractions": [
      { name: "Deira Clock Tower", distance: "600 m" },
      { name: "Union Metro East Exit Park", distance: "850 m" },
      { name: "park deira dubai", distance: "1,000 m" },
      { name: "The Floating Bridge", distance: "1.4 km" },
      { name: "Al Bastakiya", distance: "2.1 km" },
      { name: "Creek Park", distance: "2.2 km" },
      { name: "Dubai Museum", distance: "2.4 km" },
      { name: "Karama Park", distance: "2.4 km" },
      { name: "Heritage Village", distance: "3.2 km" },
      { name: "Saeed Al Maktoum House", distance: "3.2 km" },
    ],
    "Beaches in the nearby": [
      { name: "Deira Clock Tower", distance: "600 m" },
      { name: "Union Metro East Exit Park", distance: "850 m" },
      { name: "park deira dubai", distance: "1,000 m" },
      { name: "The Floating Bridge", distance: "1.4 km" },
      { name: "Al Bastakiya", distance: "2.1 km" },
      { name: "Creek Park", distance: "2.2 km" },
      { name: "Dubai Museum", distance: "2.4 km" },
      { name: "Karama Park", distance: "2.4 km" },
      { name: "Heritage Village", distance: "3.2 km" },
      { name: "Saeed Al Maktoum House", distance: "3.2 km" },
    ],
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

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      setNights(nightsCount);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (guest) {
      setSearchFilter({
        adults: guest.adults,
        children: guest.children,
        rooms: guest.rooms,
      });
    }
  }, [guest]);

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
              <img className="w-4 h-4" src={search} alt="Search icon" />
              <input
                type="search"
                value={searchedPlace}
                onChange={(e) => setSearchedPlace(e.target.value)}
                className="ml-4 text-[10px] font-medium text-custom-green w-full outline-none"
              />
            </div>

            {/* Date Pickers */}
            <p className="mt-2 text-[10px] text-custom-green">Check-in date</p>
            <div className="flex w-[97%] shadow-search mt-2 rounded justify-center">
              <DatePicker
                selected={checkInDate}
                value={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                minDate={new Date()}
                className="w-[97%] mt-2 p-2 shadow-search rounded"
                placeholderText="Select Check-in Date"
                dateFormat="EEEE, MMMM d, yyyy"
              />
            </div>

            <p className="mt-2 text-[10px] text-custom-green">Check-out date</p>
            <div className="flex w-[97%] shadow-search mt-2 rounded justify-center">
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                value={checkOutDate}
                minDate={checkInDate || new Date()}
                className="shadow-search rounded outline-none"
                placeholderText="Select Check-out Date"
                dateFormat="EEEE, MMMM d, yyyy"
                style={{ outline: "none", boxShadow: "none" }}
              />
            </div>

            <p className="mt-2 text-[10px] text-custom-green">
              {nights} nights stay
            </p>

            {/* Guest and Room Info */}
            <div className="flex w-[97%] shadow-search mt-2 py-1 px-2 rounded">
              <img className="w-4 h-4" src={guests} alt="Guest icon" />
              <input
                type="text"
                value={`${searchFilter.adults} adults | ${searchFilter.children} children | ${searchFilter.rooms} rooms`}
                readOnly
                className="ml-4 text-[10px] font-medium text-custom-green outline-none"
              />
            </div>

            <div className="w-full flex justify-center mt-5">
              <button className="text-white bg-custom-green px-6 py-1 justify-center text-medium text-xl rounded">
                Search
              </button>
            </div>
            <div className="mt-2 flex w-full justify-center">
              <a href={state.hotel.mapsLink}>
                <img src={maps} alt="Maps link" />
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
                  <button
                    className="font-medium text-white text-xl  rounded bg-custom-green px-4 py-1"
                    onClick={() => navigate("/payment", { state })}
                  >
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
              <img src={jood} className="w-full h-full object-contain" />
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
            <br />
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
              <p className="text-custom-green text-[13px] my-3 font-semibold">
                Rooms with
              </p>
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
                <p className="ml-3 text-[10px] text-custom-green">
                  Free private parking available at hotel
                </p>
              </div>
            </div>
            <button
              className="font-medium text-xl text-white bg-custom-green rounded py-1 px-3 mt-7 mb-3"
              onClick={() => navigate("/payment", { state })}
            >
              Reserve
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold text-custom-green">
            {state.hotel.name} has been welcoming Booking.com guests since May
            27, 2023
          </p>
          <p className="text-custom-green">
            Distance in property description is calculated using © OpenStreetMap
          </p>
        </div>

        <div className="p-4">
          <h3 className="text-custom-green font-semibold text-lg mb-4">
            Most popular facilities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-custom-green">
            <div className="flex items-center space-x-2">
              <img src={steam} alt="Steam Room" className="w-6 h-6" />
              <span>Steam Room</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={smoking}
                alt="Designated smoking areas"
                className="w-6 h-6"
              />
              <span>Designated smoking areas</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={bell} alt="Concierge" className="w-6 h-6" />
              <span>Concierge</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={nosmoke} alt="Non smoking rooms" className="w-6 h-6" />
              <span>Non smoking rooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={transport} alt="Airport shuttle" className="w-6 h-6" />
              <span>Airport shuttle</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={checkbox} alt="24-hour security" className="w-6 h-6" />
              <span>24-hour security</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={hours} alt="24 hour front desk" className="w-6 h-6" />
              <span>24 hour front desk</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={fitness} alt="Fitness center" className="w-6 h-6" />
              <span>Fitness center</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={swimming} alt="Swimming pool" className="w-6 h-6" />
              <span>Swimming pool</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={checkbox}
                alt="Outdoor play equipment for kids"
                className="w-6 h-6"
              />
              <span>Outdoor play equipment for kids</span>
            </div>
          </div>
        </div>

        <span className="w-full h-0.5 bg-custom-green block mt-3"></span>

        <div className="p-6">
          {/* Guest Review Header */}
          <h3 className="text-custom-green font-semibold text-lg mb-4">
            Guest Review
          </h3>

          {/* Categories Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Individual Category */}
            {[
              { title: "Staff", score: 9.6 },
              { title: "Comfort", score: 9.2 },
              { title: "Free Wifi", score: 9.7 },
              { title: "Facilities", score: 8.2 },
              { title: "Value for money", score: 8.3 },
              { title: "Cleanliness", score: 7.6 },
              { title: "Location", score: 9.5 },
            ].map(({ title, score }) => (
              <div key={title}>
                <div className="flex justify-between mb-1">
                  <span>{title}</span>
                  <span>{score}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-custom-green rounded-full"
                    style={{ width: `${score * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Select Topics Section */}
          <div className="mb-6">
            <h4 className="text-custom-green font-semibold mb-2">
              Select topics to read reviews
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Clean", "Location", "Room", "Pool", "Wifi"].map((topic) => (
                <button
                  key={topic}
                  className="px-3 py-1 border-2 border-custom-green text-custom-green rounded-sm"
                >
                  + {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Reviews Section */}
          <h4 className="text-custom-green font-semibold mb-4">
            See what guests loved the most
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Review Card */}
            {[
              {
                name: "Babar Azam",
                country: "Pakistan",
                review:
                  "“Exceptional specially staff behavior cleaning astonishing”",
                initial: "B",
                flag: "path-to-flag",
              },
              {
                name: "Muhammad",
                country: "UAE",
                review:
                  "“Cleanliness, location, Staff cooperation - Mr. Abrari & Ms. Nada Excellent people”",
                initial: "M",
                flag: "path-to-flag",
              },
              {
                name: "Zubair",
                country: "Saudi Arabia",
                review:
                  "“Good location, net and very cleaned service, especially receptionist Nada...”",
                initial: "Z",
                flag: "path-to-flag",
              },
            ].map(({ name, country, review, initial, flag }) => (
              <div
                key={name}
                className="border rounded-lg p-4 text-custom-green space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-custom-gold text-white flex items-center justify-center rounded-full font-bold">
                    {initial}
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm flex items-center">
                      <img src={flag} alt={country} className="w-4 h-4 mr-1" />{" "}
                      {country}
                    </p>
                  </div>
                </div>
                <p>{review}</p>
                <a
                  href="#"
                  className="text-custom-gold font-semibold underline"
                >
                  Read all
                </a>
              </div>
            ))}
          </div>

          {/* Read All Button */}
          <button className="w-full md:w-auto px-6 py-2 bg-custom-green text-white font-semibold rounded-md">
            Read all
          </button>
        </div>

        <span className="w-full h-0.5 bg-custom-green block mt-3"></span>

        <div className="flex flex-col space-y-8 text-custom-green p-4">
          {/* Top Section */}
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Left Column */}
            <div className="flex flex-col space-y-3 p-4 border border-gray-300 rounded-lg w-full md:w-1/3">
              <h2 className="font-semibold">Travelers are asking</h2>
              {questions.map((question, index) => (
                <div key={index} className="flex justify-between">
                  <span>{question}</span>
                  <span>&gt;</span>
                </div>
              ))}
            </div>

            {/* Middle Column */}
            <div className="flex flex-col space-y-3 p-4 border border-gray-300 rounded-lg md:flex-grow">
              <h2 className="font-semibold">Travelers are asking</h2>
              {questions.map((question, index) => (
                <div key={index} className="flex justify-between">
                  <span>{question}</span>
                  <span>&gt;</span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center items-center p-6 border border-gray-300 rounded-lg text-center w-full md:w-1/3">
              <p className="font-semibold">Still looking?</p>
              <button className="mt-2 px-4 py-2 bg-custom-green text-white rounded-lg">
                Ask question
              </button>
              <p className="mt-1">We reply instantly</p>
            </div>
          </div>

          {/* Nearby Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(nearbyInfo).map((sectionTitle, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3">{sectionTitle}</h3>
                <ul className="space-y-1">
                  {nearbyInfo[sectionTitle].map((location, idx) => (
                    <li key={idx}>
                      {location.name} – {location.distance}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <span className="w-full h-0.5 bg-custom-green block mt-3"></span>

        <section>
          <p className="text-2xl font-extrabold mt-16 mb-4 font-montserrat text-custom-green">
            Inspired By Properties You Looked At
          </p>
          <TopAccomodation />
        </section>
      </div>
    </div>
  );
};

export default HotelInfo;
