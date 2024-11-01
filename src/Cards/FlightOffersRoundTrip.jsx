import React, { useState } from "react";

const RoundTripFlightOfferCard = ({ offer }) => {
  const {
    total_amount,
    total_currency,
    base_amount,
    tax_amount,
    total_emissions_kg,
    slices,
    payment_requirements,
  } = offer;

  const [isRoundTrip, setIsRoundTrip] = useState(true); // State to toggle between one-way and round-trip

  // Extract details from the first slice (outbound flight)
  const outboundSlice = slices[0];
  const {
    origin: outboundOrigin,
    destination: outboundDestination,
    departing_at: outboundDepartingAt,
    arriving_at: outboundArrivingAt,
    operating_carrier: outboundCarrier,
    passengers: outboundPassengers,
    marketing_carrier_flight_number,
  } = outboundSlice?.segments[0];

  // Extract details from the second slice (return flight)
  const returnSlice = slices[1];
  const {
    origin: returnOrigin,
    destination: returnoutboundDestination,
    departing_at: returnDepartingAt,
    arriving_at: returnArrivingAt,
    operating_carrier: returnCarrier,
    passengers: returnPassengers,
    marketing_carrier_flight_number: returnMarketing,
  } = returnSlice?.segments[0];

  // Format time and calculate duration functions
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (start, end) => {
    const durationMs = new Date(end) - new Date(start);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="" >
      {/* Carrier Image */}
      

      {/* Flight Information Card */}
      <div className="bg-white shadow-lg rounded-xl p-4 mb-4 flex w-full">
        {/* Airline Logo */}
        <div className="flex-shrink-0 flex justify-center items-center mr-4">
          <img
            src={outboundCarrier?.logo_symbol_url}
            alt={`${outboundCarrier?.logo_symbol_url} logo`}
            className="w-24 h-24 rounded"
          />
        </div>

        {/* Flight Information Container */}
        <div className=" flex-grow">
          {/* Outbound Flight Information */}
          <div className="flex-grow relative mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-custom-green">
                  {outboundCarrier?.name}
                </h2>
                <p className="text-custom-green">
                  {marketing_carrier_flight_number}
                </p>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
              <div className="text-center">
                <p className="text-sm font-semibold">
                  {new Date(outboundDepartingAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl font-bold text-custom-gold">
                  {formatTime(outboundDepartingAt)}
                </p>
                <p className="text-sm font-medium">
                  {outboundOrigin?.iata_city_code}
                </p>
              </div>

              {/* Duration and Flight Class */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm">
                  {calculateDuration(outboundDepartingAt, outboundArrivingAt)}
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {outboundPassengers[0]?.cabin_class}
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold">
                  {new Date(outboundArrivingAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl font-bold text-custom-gold">
                  {formatTime(outboundArrivingAt)}
                </p>
                <p className="text-sm font-medium">
                  {returnOrigin?.iata_city_code}
                </p>
              </div>
            </div>
          </div>

          {/* Return Flight Information */}
          <div className="flex-grow relative">
            <div className="flex justify-between items-center">
              <div>
                {/* <h2 className="text-lg font-bold text-custom-green">
                  {returnCarrier.name}
                </h2> */}
                <p className="text-custom-green">{returnMarketing}</p>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
              <div className="text-center">
                <p className="text-sm font-semibold">
                  {new Date(returnDepartingAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl font-bold text-custom-gold">
                  {formatTime(returnDepartingAt)}
                </p>
                <p className="text-sm font-medium">
                  {returnOrigin?.iata_city_code}
                </p>
              </div>

              {/* Duration and Flight Class */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm">
                  {calculateDuration(returnDepartingAt, returnArrivingAt)}
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {returnPassengers[0]?.cabin_class}
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold">
                  {new Date(returnArrivingAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl font-bold text-custom-gold">
                  {formatTime(returnArrivingAt)}
                </p>
                <p className="text-sm font-medium">
                  {outboundOrigin?.iata_city_code}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-gray-600">
              <p>Emissions: {total_emissions_kg} kg</p>
              <p>
                Refundable:{" "}
                {payment_requirements?.requires_instant_payment ? "Yes" : "No"}
              </p>
            </div>
            <div className="mt-6">
              <p
                className={`text-sm ${
                  payment_requirements?.requires_instant_payment
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {payment_requirements?.requires_instant_payment
                  ? "Requires Instant Payment"
                  : "Payment not required immediately"}
              </p>
            </div>

            {/* Price Tag and Book Now Button */}
            <div className="absolute bottom-0 right-4 text-right">
              <p className="text-xl font-semibold ">
                {total_amount} {total_currency}
              </p>
              <p className="text-gray-500 text-sm">
                Base: {base_amount} {total_currency} (Tax: {tax_amount}{" "}
                {total_currency})
              </p>
              <button className="mt-2 bg-custom-gold text-white text-xs px-3 py-1 rounded hover:bg-yellow-600">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundTripFlightOfferCard;
