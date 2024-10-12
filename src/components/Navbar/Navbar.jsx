import React, { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import headerBg from "../../assets/headerBg.png";
import logo from "../../assets/logo.png";
import currency from "../../assets/currency.svg";
import pakistan from "../../assets/pakistan.svg";
import plane from "../../assets/plane.svg";
import search from "../../assets/search.svg";
import user from "../../assets/user.svg";
import bed from "../../assets/Bed.svg";
import schedule from "../../assets/Schedule.svg";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [subActiveLink, setSubActiveLink] = useState("null");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

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

  return (
    <div
      style={{ backgroundImage: `url(${headerBg})` }}
      className="w-full h-[306px] bg-cover bg-center bg-no-repeat relative"
    >
      {/* Logo + Home buttons section */}
      <div className="hidden md:flex w-full flex-row justify-center py-[25px] items-center">
        <img src={logo} className="w-[60px] h-[60px]" alt="Logo" />
        <h1 className="text-white font-bold ml-[20px] mr-[170px] font-inter">
          Barfly.com
        </h1>
        <ul className="text-white font-semibold text-[15px] flex flex-row space-x-1 relative">
          <li
            className={`group w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
              activeLink === "home"
                ? "text-[#D2B57A] bg-white"
                : "hover:text-[#D2B57A]"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            <a href="#" className="relative z-10 font-p">
              Home
              <span
                className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 w-0 group-hover:w-full ${
                  activeLink === "home" ? "w-full" : "w-0"
                }`}
              ></span>
            </a>
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
      <ul className="hidden md:flex w-full bg-orange-200 h-20 justify-center flex-row">
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
            <div>
              <p className="text-[#525B31] font-bold text-base font-montserrat">
                Who?
              </p>
              <p className="text-[#525B31] text-[15px] font-montserrat">
                Add Guests
              </p>
            </div>
            <button className="flex flex-row w-[140px] h-14 items-center px-4 py-2 bg-[#D2B57A] text-white transition rounded-[40px] ml-auto">
              <img src={search} />
              <p className="ml-auto text-[20px]">Search</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
