import React, { useState } from "react";
import { DateTime } from "luxon";
import { isDuration } from "moment-timezone";

const FlightOfferCard = ({ offer }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    total_amount,
    total_currency,
    base_amount,
    tax_amount,
    total_emissions_kg,
    slices,
    payment_requirements,
  } = offer;

  const firstSlice = slices[0];
  const segment = firstSlice.segments[0];
  const {
    origin,
    destination,
    departing_at,
    operating_carrier,
    passengers,
  } = segment;
  const finalSegment = firstSlice.segments[firstSlice.segments.length - 1]
  const { arriving_at } = finalSegment

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/P(\d+D)?T?(\d+H)?(\d+M)?/);
    if (!match) return "Invalid duration";
  
    // Extract the day, hour, and minute components from the match
    const days = match[1] ? match[1].toLowerCase() : null;
    const hours = match[2] ? match[2].toLowerCase() : "0h";
    const minutes = match[3] ? match[3].toLowerCase() : "0m";
  
    // Only include the day part if days is not null (i.e., not 0)
    return `${days ? days : ""} ${hours} ${minutes}`.trim();
  };

  const formatCustomDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  // Convert and format dates in the specified timezone
  const convertTimeBetweenTimezones = (isoTime, originTimeZone, targetTimeZone) => {
    return DateTime.fromISO(isoTime, { zone: originTimeZone })
      .setZone(targetTimeZone)
      .toFormat("EEE, MMM dd, HH:mm");
  };

  // Calculate duration between departure and arrival times
  const calculateDuration = (departure, arrival, originTimeZone, destinationTimeZone) => {
    const departureDate = DateTime.fromISO(departure, { zone: originTimeZone });
    const arrivalDate = DateTime.fromISO(arrival, { zone: destinationTimeZone });
    const duration = arrivalDate.diff(departureDate, ["hours", "minutes"]);
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const totalStops = slices.reduce((sum, slice) => sum + slice.segments.length - 1, 0);

  // Get the final destination for the main card
  const finalDestination = totalStops > 0
    ? slices[slices.length - 1].segments[slices[slices.length - 1].segments.length - 1].destination.iata_code
    : destination.iata_code;

  // Calculate total duration for the main card considering multiple segments
  const calculateTotalDuration = () => {
    const departure = slices[0].segments[0].departing_at;
    const arrival = slices[slices.length - 1].segments[slices[slices.length - 1].segments.length - 1].arriving_at;
    return calculateDuration(departure, arrival, origin.time_zone, destination.time_zone);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row relative">
      {/* Carrier Image */}
      <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0 md:mr-4">
        <img
          src={operating_carrier.logo_symbol_url}
          alt={`${operating_carrier.name} logo`}
          className="w-24 h-24 rounded"
        />
      </div>

      {/* Flight Information */}
      <div className="flex-grow relative">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-custom-green">
              {operating_carrier.name}
            </h2>
            <p className="text-custom-green">
              {segment.marketing_carrier_flight_number}
            </p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(departing_at)}
            </p>
            <p className="text-sm font-medium">{origin.iata_code}</p>
          </div>

          {/* Duration and Flight Class */}
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">
              {formatDuration(slices[0].duration)}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {passengers[0]?.cabin_class_marketing_name}
            </span>
            {totalStops > 0 && (
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-500 text-xs mt-1"
              >
                {totalStops} stop{totalStops > 1 ? "s" : ""} (
                {slices[0].segments[1].origin.iata_code})
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(arriving_at)}
            </p>
            <p className="text-sm font-medium">{finalDestination}</p>
          </div>
        </div>

        {/* Additional Info - Emissions and Refundability */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 text-gray-600 space-y-2 sm:space-y-0">
          <div>
            <p>Emissions: {total_emissions_kg} kg</p>
            <p>
              Refundable:{" "}
              {payment_requirements.requires_instant_payment ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p
              className={`text-sm ${
                payment_requirements.requires_instant_payment
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {payment_requirements.requires_instant_payment
                ? "Requires Instant Payment"
                : "Payment not required immediately"}
            </p>
          </div>
        </div>

        {/* Price and Book Now Button */}
        <div className="flex flex-col items-start sm:items-end sm:mt-0 mt-3 text-right sm:text-left">
          <p className="text-xl font-semibold">
            {total_amount} {total_currency}
          </p>
          <p className="text-gray-500 text-sm">
            {base_amount} {total_currency} (Tax: {tax_amount} {total_currency})
          </p>
          <button className="mt-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600">
            Book Now
          </button>
        </div>
      </div>

      {/* Stops Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-custom-green">Flight Details</h2>
            {slices.map((slice, sliceIndex) => (
              <div key={sliceIndex} className="mb-4">
                <h3 className="text-xl font-bold text-custom-gold">
                  {sliceIndex === 0 ? "Outbound Flight" : "Return Flight"}
                </h3>
                {slice.segments.map((segment, segmentIndex) => (
                  <div
                    key={segmentIndex}
                    className="mb-4 border-b-black border-b-[2px] pb-2"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h2 className="text-lg font-bold text-custom-green">
                          {segment.operating_carrier?.name}
                        </h2>
                        <p className="text-custom-green">
                          Flight {segment.marketing_carrier_flight_number}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <div className="text-center">
                        <p className="text-sm font-semibold">
                          {convertTimeBetweenTimezones(segment.departing_at, segment.origin.time_zone, "Asia/Dubai")}
                        </p>
                        <p className="text-sm font-medium">
                          {segment.origin?.iata_code}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-sm">
                          {calculateDuration(segment.departing_at, segment.arriving_at, segment.origin.time_zone, segment.destination.time_zone)}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">
                          {segment.passengers[0]?.cabin_class}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-semibold">
                          {convertTimeBetweenTimezones(segment.arriving_at, segment.destination.time_zone, "Asia/Dubai")}
                        </p>
                        <p className="text-sm font-medium">
                          {segment.destination?.iata_code}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightOfferCard;
