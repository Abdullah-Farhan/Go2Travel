import React, { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import headerBg from "../../assets/png/headerBg.png";
import logo from "../../assets/png/logo.png";
import currency from "../../assets//svg/currency.svg";
import pakistan from "../../assets/svg/pakistan.svg";
import plane from "../../assets/svg/plane.svg";
import search from "../../assets/svg/search.svg";
import user from "../../assets/svg/user.svg";
import bed from "../../assets/svg/Bed.svg";
import schedule from "../../assets/svg/Schedule.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [subActiveLink, setSubActiveLink] = useState("null");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guest, setGuest] = useState();
  const navigate = useNavigate();

  const location = window.location.pathname;

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSubLinkClick = (link) => {
    setSubActiveLink(link);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleDropdown = () => {
    setGuest({
      adults: adults,
      children: children,
      rooms: rooms
    })
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchResults = () => {
    navigate("/results", {state: {guest}});
  };

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <>
      {location === "/payment" || location === "/checkout" ? (
        <>
          <div className="hidden md:flex w-full flex-row justify-center py-[25px] items-center bg-[linear-gradient(to_right,_#525B31_0%,_#BED206_50%,_#525B31_100%)]">
            <Link to={"/"} className="flex justify-center items-center">
              <img
                src={logo}
                className="w-[60px] h-[60px]"
                alt="Logo"
                onClick={() => handleNavigation()}
              />
              <h1
                className="text-white font-bold ml-[20px] mr-[170px] font-inter"
                onClick={() => handleNavigation()}
              >
                Barfly.com
              </h1>
            </Link>
            <ul className="text-white font-semibold text-[15px] flex flex-row space-x-1 relative">
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "home"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("home")}
              >
                <Link to={"/"} className="relative z-10 font-p">
                  Home
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "home" ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              </li>
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "about"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("about")}
              >
                <a href="#" className="relative z-10 font-inter">
                  About
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "about" ? "w-full" : "w-0 hover:w-full"
                    }`}
                  ></span>
                </a>
              </li>
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "help"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("help")}
              >
                <a
                  href="#"
                  className="relative z-10 flex justify-center items-center hover:bg-white"
                >
                  Help
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "help" ? "w-full" : "w-0"
                    }`}
                  ></span>
                </a>
              </li>
            </ul>
            <img src={currency} className="ml-[50px] w-[15px] h[15px]" />
            <p className="font-semibold text-[15px] text-white ml-[5px] flex flex-row">
              PKR . <img src={pakistan} className="mx-[5px]" /> PAK
            </p>
            <button className="shadow-custom w-[107px] h-[30px] bg-white rounded-[5px] text-[#D2B57A] font-semibold mx-[20px]">
              Register
            </button>
            <button className="shadow-custom w-[107px] h-7 bg-white rounded-[5px] text-[#D2B57A] font-semibold">
              Login
            </button>
          </div>
        </>
      ) : (
        <div
          style={{ backgroundImage: `url(${headerBg})` }}
          className="w-full h-[180px] md:h-[306px] bg-cover bg-center bg-no-repeat relative"
        >
          {/* Logo + Home buttons section */}
          <div className="hidden md:flex w-full flex-row justify-center py-[25px] items-center">
            <Link to={"/"} className="flex justify-center items-center">
              <img
                src={logo}
                className="w-[60px] h-[60px]"
                alt="Logo"
                onClick={() => handleNavigation()}
              />
              <h1
                className="text-white font-bold ml-[20px] mr-[170px] font-inter"
                onClick={() => handleNavigation()}
              >
                Barfly.com
              </h1>
            </Link>
            <ul className="text-white font-semibold text-[15px] flex flex-row space-x-1 relative">
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "home"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("home")}
              >
                <Link to={"/"} className="relative z-10 font-p">
                  Home
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "home" ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              </li>
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "about"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("about")}
              >
                <a href="#" className="relative z-10 font-inter">
                  About
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "about" ? "w-full" : "w-0 hover:w-full"
                    }`}
                  ></span>
                </a>
              </li>
              <li
                className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
                  activeLink === "help"
                    ? "text-[#D2B57A] bg-white"
                    : "hover:text-[#D2B57A]"
                }`}
                onClick={() => handleLinkClick("help")}
              >
                <a
                  href="#"
                  className="relative z-10 flex justify-center items-center hover:bg-white"
                >
                  Help
                  <span
                    className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                      activeLink === "help" ? "w-full" : "w-0"
                    }`}
                  ></span>
                </a>
              </li>
            </ul>
            <img src={currency} className="ml-[50px] w-[15px] h[15px]" />
            <p className="font-semibold text-[15px] text-white ml-[5px] flex flex-row">
              PKR . <img src={pakistan} className="mx-[5px]" /> PAK
            </p>
            <button className="shadow-custom w-[107px] h-[30px] bg-white rounded-[5px] text-[#D2B57A] font-semibold mx-[20px]">
              Register
            </button>
            <button className="shadow-custom w-[107px] h-7 bg-white rounded-[5px] text-[#D2B57A] font-semibold">
              Login
            </button>
          </div>

          <div className="hidden md:flex justify-center items-center mb-6">
            <p className="font-black font-montserrat text-5xl text-white">
              S<span>TAY SOMEWHERE GREAT!</span>
            </p>
          </div>

          {/* Sub links */}
          <ul className="hidden md:flex w-full h-20 justify-center flex-row">
            <li className="text-white group">
              <a href="" onClick={() => handleSubLinkClick("flight")}>
                <img src={plane} className="" />
                <p className="font-montserrat font-semibold text-lg mb-2.5">
                  Flight
                </p>
                <span
                  className={`block h-[2px] bg-white left-0 right-0 transition-all duration-200 w-0 group-hover:w-full ${
                    subActiveLink === "flight" ? "w-full" : "w-0"
                  }`}
                ></span>
              </a>
            </li>
          </ul>

          {/* Search bar container */}
          {location === "/hotel-info" ? (
            <></>
          ) : (
            <>
              <div className="hidden md:flex w-full  flex-col justify-end items-center">
                <div className="w-[954px] h-[80px] bg-white rounded-[40px] bottom-0 shadow-search-container flex flex-row justify-between">
                  <div className="w-[291px] h-20 rounded-[40px] shadow-search flex flex-row items-center px-2 py-3">
                    <div className="h-full ml-10">
                      <img src={bed} />
                    </div>
                    <div className="ml-4 h-full">
                      <p className="text-[#525B31] font-bold text-base font-montserrat">
                        Where?
                      </p>
                      <p className="text-[#525B31] text-base font-montserrat">
                        Search Destinations
                      </p>
                    </div>
                  </div>

                  <div className="w-[273px] h-20 rounded-[40px] shadow-search mx-2.5 items-center px-2 py-3 flex flex-row">
                    <div className="h-full ml-4 mr-2">
                      <img src={schedule} width={20} height={20} />
                    </div>
                    <div className="h-full">
                      <p className="text-[#525B31] font-bold text-base font-montserrat">
                        Check-in _ Check-out
                      </p>
                      <DatePicker />
                    </div>
                  </div>

                  <div className="w-[370px] h-20 rounded-[40px] shadow-search flex flex-row items-center px-2 py-3">
                    <div className="h-full flex flex-col ml-10 mr-[25px]">
                      <img src={user} width={20} height={20} />
                    </div>
                    <div onClick={() => toggleDropdown()}>
                      <p className="text-[#525B31] font-bold text-base font-montserrat">
                        Who?
                      </p>
                      {guest    ? (
                        <>
                          <p>
                            {adults} adults | {children} children | {rooms}{" "}
                            rooms
                          </p>
                        </>
                      ) : (
                        <p className="text-[#525B31] text-[15px] font-montserrat">
                          Add Guests
                        </p>
                      )}
                    </div>
                    <button
                      className="flex flex-row w-[140px] h-14 items-center px-4 py-2 bg-[#D2B57A] text-white transition rounded-[40px] ml-auto"
                      onClick={() => handleSearchResults()}
                    >
                      <img src={search} />
                      <p className="ml-auto text-[20px]">Search</p>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute z-10 mt-80 w-60 h-56 bg-white rounded-lg shadow-lg">
                        <section className="flex flex-row justify-between h-16 border-b border-b-[#D2B57A] pr-3">
                          <div className="pt-4 pl-6">
                            <p className="font-bold text-custom-green">Adult</p>
                            <p className="text-custom-green text-[10px]">
                              (Age 17 or above)
                            </p>
                          </div>
                          <div className="flex flex-row justify-between w-20">
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setAdults(adults - 1)}
                                disabled={adults === 1}
                              >
                                -
                              </button>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="mx-2">{adults}</p>
                            </div>
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setAdults(adults + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </section>
                        <section className="flex flex-row justify-between h-16 border-b border-b-[#D2B57A] pr-3">
                          <div className="pt-4 pl-6">
                            <p className="font-bold text-custom-green">
                              Children
                            </p>
                            <p className="text-custom-green text-[10px]">
                              (Age 0 to 17)
                            </p>
                          </div>
                          <div className="flex flex-row justify-between w-20">
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setChildren(children - 1)}
                                disabled={children === 0}
                              >
                                -
                              </button>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="mx-2">{children}</p>
                            </div>
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setChildren(children + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </section>
                        <section className="flex flex-row justify-between h-12 border-b border-b-[#D2B57A] pr-3">
                          <div className="pl-6 h-full flex flex-row items-center">
                            <p className="font-bold text-custom-green">Rooms</p>
                          </div>
                          <div className="flex flex-row justify-between w-20">
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setRooms(rooms - 1)}
                                disabled={rooms === 1}
                              >
                                -
                              </button>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="mx-2">{rooms}</p>
                            </div>
                            <div className="flex justify-center items-center">
                              <button
                                className="w-4 h-4 rounded-full bg-custom-gold flex justify-center items-center"
                                onClick={() => setRooms(rooms + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </section>
                        <section className="flex flex-row justify-center items-center h-12 ">
                          <button
                            className="w-32 h-7 bg-custom-gold rounded-md text-white font-semibold text-[10px]"
                            onClick={() => toggleDropdown()}
                          >
                            Done
                          </button>
                        </section>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
