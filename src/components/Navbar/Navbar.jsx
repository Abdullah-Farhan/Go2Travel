import React, { useState } from "react";
import headerBg from "../../assets/headerBg.png";
import logo from "../../assets/logo.png";
import currency from "../../assets/currency.svg";
import pakistan from "../../assets/pakistan.svg";
import plane from "../../assets/plane.svg";
import search from "../../assets/search.svg";
import user from "../../assets/user.svg";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [subActiveLink, setSubActiveLink] = useState("flight");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSubLinkClick = (link) => {
    setSubActiveLink(link);
  };

  return (
    <div
      style={{ backgroundImage: `url(${headerBg})` }}
      className="w-full h-[306px] bg-cover bg-center bg-no-repeat"
    >
      {/* Logo + Home buttons section */}
      <div className="w-full flex flex-row justify-center py-[25px] items-center">
        <img src={logo} className="w-[60px] h-[60px]" alt="Logo" />
        <h1 className="text-white font-bold ml-[20px] mr-[170px] font-inter">
          Barfly.com
        </h1>
        <ul className="text-white font-semibold text-[15px] flex flex-row space-x-1 relative">
          <li
            className={`w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
              activeLink === "home"
                ? "text-[#D2B57A] bg-white"
                : "hover:text-[#D2B57A]"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            <a href="#" className="relative z-10 font-p">
              Home
              <span
                className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 ${
                  activeLink === "home" ? "w-full" : "w-0"
                }`}
              ></span>
            </a>
          </li>
          <li
            className={`w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
              activeLink === "about"
                ? "text-[#D2B57A] bg-white"
                : "hover:text-[#D2B57A]"
            }`}
            onClick={() => handleLinkClick("about")}
          >
            <a href="#" className="relative z-10 font-inter">
              About
              <span
                className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 ${
                  activeLink === "about" ? "w-full" : "w-0 hover:w-full"
                }`}
              ></span>
            </a>
          </li>
          <li
            className={`w-[63px] h-[28px] hover:bg-white flex justify-center items-center relative cursor-pointer transition-all duration-200 rounded-[5px] ${
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
                className={`absolute mt-[20px] left-0 right-0 h-[1px] bg-[#D2B57A] transition-all duration-200 ${
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

      <div className="flex justify-center items-center mb-6">
        <p className="font-black font-montserrat text-5xl text-white">
          S<span>TAY SOMEWHERE GREAT!</span>
        </p>
      </div>

      <div className="w-full bg-orange-200 h-[80px]">
        <div className="">
          <img src={plane} className="" />
          <p className="font-montserrat font-semibold text-lg mb-2.5">Flight</p>
          <span className="w-full h-[2px] bg-white absolute left-0 right-0 transition-all duration-200"></span>
        </div>
      </div>

      <div className="w-full flex flex-col justify-end items-center">
        <div className="w-[954px] h-[80px] bg-white rounded-[40px] bottom-0 shadow-search-container flex flex-row justify-between">
          <div className="w-[291px] h-20 rounded-[40px] shadow-search flex flex-row"></div>
          <div className="w-[273px] h-20 rounded-[40px] shadow-search mx-2.5"></div>
          <div className="w-[370px] h-20 rounded-[40px] shadow-search flex flex-row items-center px-2 py-3">
            <div className="h-full flex flex-col ml-10 mr-[25px]">
              <img src={user} width={20} height={20}/>
            </div>
            <div>
              <p className="text-[#525B31] font-bold text-base">Who?</p>
              <p className="text-[#525B31] text-[15px]">Add Guests</p>
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
