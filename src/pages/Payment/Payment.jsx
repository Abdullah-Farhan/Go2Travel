import React, { useState } from "react";
import guest from "../../assets/svg/guest.svg";
import cancelation from '../../assets/svg/cancelation.svg';
import iota from "../../assets/svg/iota.svg";

const Payment = () => {
  const signedInUserDetails = {
    email: "babar_azam@gmail.com",
    pfp: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  };
  const [isOn, setIsOn] = useState(false);
  const [selected, setSelected] = useState("");
  const [request, setRequest] = useState("")

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex justify-center">
      <section className="w-[954px]">
        <section className="w-full h-11 flex flex-row justify-between px-6 items-center mt-3">
          <div className="flex justify-center items-center bg-custom-gold w-11 h-11 rounded-full text-white font-bold text-2xl flex-shrink-0">
            1
          </div>
          <span className="w-[40%] h-[1px] bg-custom-green"></span>
          <div className="flex justify-center items-center bg-custom-gold w-11 h-11 rounded-full text-white font-bold text-2xl flex-shrink-0">
            2
          </div>
          <span className="w-[40%] h-[1px] bg-custom-green"></span>
          <div className="flex justify-center items-center border w-11 h-11 rounded-full border-[#798192] font-bold text-2xl flex-shrink-0">
            3
          </div>
        </section>
        <section className="w-full flex flex-row justify-between">
          <div className="font-medium text-custom-green">Your selection</div>
          <div className="ml-[-20px] font-medium text-custom-green">
            Your Details
          </div>
          <div className="font-medium text-custom-green">Final step</div>
        </section>
        <span className="w-full h-[1px] bg-[#4F5831] block mt-5"></span>

        {/* Content Section */}
        <section className="w-full flex flex-col md:flex-row justify-between">
          <section className="w-full md:w-72">Selected Hotel Data</section>

          <section className="w-full md:w-[60%] mt-6">
            {signedInUserDetails &&
            Object.keys(signedInUserDetails).length > 0 ? (
              <>
                <div className="w-full h-24 items-center flex border border-[#4F5831] rounded-md pl-4">
                  <div className="w-20 h-20 rounded-full flex bg-custom-gold justify-center items-center font-bold text-2xl text-white">
                    {signedInUserDetails.pfp ? (
                      <>
                        <div className="w-20 h-20 rounded-full flex bg-custom-gold justify-center items-center">
                          <img
                            src={signedInUserDetails.pfp}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </>
                    ) : (
                      <>{signedInUserDetails.email[0]}</>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-custom-green">
                      you are signed in
                    </p>
                    <p className="font-light text-custom-green">
                      {signedInUserDetails.email}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-24 justify-center flex border flex-col border-[#4F5831] rounded-md pl-4">
                  <p className="font-bold text-custom-green">
                    Sign in to continue
                  </p>
                  <button className="w-24 h-8 flex justify-center items-center bg-custom-gold rounded-md text-white">
                    Sign in
                  </button>
                </div>
              </>
            )}
            <section className="w-full mt-6 flex border border-[#4F5831] rounded-md pl-4 flx- flex-col">
              <p className="mt-3 font-bold text-custom-green">
                Enter your details
              </p>
              <div className="flex flex-row w-full justify-between mt-4">
                <p className="font-light text-custom-green">
                  I am travelling for work
                </p>
                <div className="flex items-center mr-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isOn}
                        onChange={toggleSwitch}
                      />
                      <div
                        className={`block w-12 h-6 rounded-full ${
                          isOn ? "bg-custom-green" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`absolute  left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                          isOn
                            ? "transform translate-x-6 bg-custom-gold"
                            : "bg-white"
                        }`}
                      ></div>
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-80">
                <div className="flex w-full justify-between mt-5">
                  <fieldset className="border border-custom-gold rounded-md w-36 h-12">
                    <legend className="text-[8px] font-semibold text-custom-green ml-2 px-2 z-20">
                      First Name
                    </legend>
                    <input
                      type="text"
                      className="bg-transparent outline-none rounded p-2 w-36 mt-[-6px] z-0 object-cover border-0"
                      placeholder="Enter first name"
                    />
                  </fieldset>
                  <fieldset className="border border-custom-gold rounded-md w-36 h-12">
                    <legend className="text-[8px] font-semibold text-custom-green ml-2 px-2 z-20">
                      Last Name
                    </legend>
                    <input
                      type="text"
                      className="bg-transparent outline-none rounded p-2 w-36 mt-[-6px] z-0 object-cover border-0"
                      placeholder="Enter last name"
                    />
                  </fieldset>
                </div>
                <fieldset className="border border-custom-gold rounded-md w-80 h-12 mt-6">
                  <legend className="text-[8px] font-semibold text-custom-green ml-2 px-2 z-20">
                    Email
                  </legend>
                  <input
                    type="email"
                    className="bg-transparent outline-none rounded p-2 w-36 mt-[-6px] z-0 object-cover border-0"
                    placeholder="Enter email"
                  />
                </fieldset>
              </div>
              <p className="font-semibold text-custom-green mt-5">Who are you booking for?</p>
              <div className="flex flex-col py-4">
                <label className="flex items-center mb-4 cursor-pointer">
                  <input
                    type="radio"
                    value="main"
                    checked={selected === "main"}
                    onChange={() => setSelected("main")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center mr-2
                        ${
                          selected === "main"
                            ? "border-custom-gold"
                            : "border-gray-400"
                        }
                    `}
                  >
                    {selected === "main" && (
                      <div className="w-4 h-4 bg-custom-gold rounded-full" />
                    )}
                  </div>
                  <p className="font-light text-custom-green">I am the main guest</p>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="someoneElse"
                    checked={selected === "someoneElse"}
                    onChange={() => setSelected("someoneElse")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center mr-2
                        ${
                          selected === "someoneElse"
                            ? "border-custom-gold"
                            : "border-gray-400"
                        }
                    `}
                  >
                    {selected === "someoneElse" && (
                      <div className="w-4 h-4 bg-custom-gold rounded-full" />
                    )}
                  </div>
                  <p className="font-light text-custom-green">I am booking for someone else</p>
                </label>
              </div>
            </section>

            <section className="w-full mt-6 flex border border-[#4F5831] rounded-md pl-4 flx- flex-col">
              <p className="mt-3 font-bold text-custom-green">
                Delux 3 bedroom apartment
              </p>
                <div className="flex flex-row mt-6 mb-3">
                    <img src={guest}  className="mr-2"/>
                    <p className="font-light text-xl text-custom-green">Guests | 2 adults</p>
                </div>
                <div className="flex">
                    <img src={cancelation} className="mr-2"/>
                    <p className="font-light text-xl text-custom-green">Free cancelation</p>
                </div>
                <fieldset className="border border-custom-gold rounded-md w-64 h-12 mt-7 mb-6">
                    <legend className="text-[8px] font-semibold text-custom-green ml-2 px-2 z-20">
                      Full guest name
                    </legend>
                    <input
                      type="text"
                      className="bg-transparent outline-none rounded p-2 w-64 mt-[-6px] z-0 object-cover border-0"
                      placeholder="Enter first name"
                    />
                  </fieldset>
            </section>

            <section className="w-full mt-6 flex border border-[#4F5831] rounded-md pl-4 flx- flex-col">
              <p className="mt-3 font-bold text-custom-green">
                Special request
              </p>
              <p className="text-xl font-light text-custom-green mt-6">Type your request here</p>
                <div className="flex flex-row mt-6 mb-3 items-center">
                    <img src={iota}  className="mr-2"/>
                    <p className="font-semibold text-[10px] text-custom-green">We do not guarantee to complete the special request!</p>
                </div>
                <textarea placeholder="Start typing here" className="px-4 py-2 mr-4 h-24 resize-none text-custom-green border border-[#798192]"  value={request} maxLength={500} onChange={(text)=>setRequest(text.target.value)}/>
                <div className="mb-6 flex justify-end mr-4 mt-1 text-[#798192] font-semibold text-[10px]">{request.length}/500</div>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Payment;
