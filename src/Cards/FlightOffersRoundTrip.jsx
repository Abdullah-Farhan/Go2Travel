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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Calculate the total number of stops across all slices
  const totalStops = slices.reduce(
    (total, slice) => total + (slice.segments.length - 1),
    0
  );

  // Format time in 24-hour format with date
  const formatDateTime = (date) => {
    const data = 
     new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    console.log(data, date)
    return data
  };

  // Calculate total duration
  const calculateTotalDuration = (firstSegment, lastSegment) => {
    const departureTime = new Date(firstSegment.departing_at);
    const arrivalTime = new Date(lastSegment.arriving_at);
    const durationMs = arrivalTime - departureTime;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-lg rounded-xl p-4 mb-4 flex flex-col md:flex-row w-full">
        <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0 md:mr-4">
          <img
            src={slices[0].segments[0].operating_carrier?.logo_symbol_url}
            alt={`${slices[0].segments[0].operating_carrier?.logo_symbol_url} logo`}
            className="w-24 h-24 rounded"
          />
        </div>

        <div className="flex-grow">
          {slices.map((slice, sliceIndex) => {
            const firstSegment = slice.segments[0];
            const lastSegment = slice.segments[slice.segments.length - 1];

            return (
              <div key={sliceIndex} className="mb-6">
                <h3 className="text-lg font-bold text-custom-green">
                  {sliceIndex === 0 ? "Outbound Flight" : "Return Flight"}
                </h3>
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        {formatDateTime(firstSegment.departing_at)}
                      </p>
                      <p className="text-sm font-medium">
                        {firstSegment.origin?.iata_code}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-gray-400 text-sm">
                        {calculateTotalDuration(firstSegment, lastSegment)}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {firstSegment.passengers[0]?.cabin_class}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        {formatDateTime(lastSegment.arriving_at)}
                      </p>
                      <p className="text-sm font-medium">
                        {lastSegment.destination?.iata_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Single Button Displaying Total Stops */}
          {totalStops > 0 && (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="mt-4 bg-custom-gradient text-white text-sm px-3 py-1 rounded"
            >
              {totalStops} Stop{totalStops > 1 ? "s" : ""}
            </button>
          )}

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
        </div>

        <div className="absolute bottom-4 right-4 text-right mb-2">
          <p className="text-xl font-semibold">
            {total_amount} {total_currency}
          </p>
          <p className="text-gray-500 text-sm">
            {base_amount} {total_currency} (Tax: {tax_amount} {total_currency})
          </p>
          <button className="mt-2 bg-custom-gold text-white text-xs px-3 py-1 rounded hover:bg-yellow-600">
            Book Now
          </button>
        </div>
      </div>

      {/* Popup for displaying flight details */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-lg font-bold text-custom-green">Flight Details</h2>
            {slices.map((slice, sliceIndex) => (
              <div key={sliceIndex} className="mb-4">
                <h3 className="text-lg font-bold text-custom-green">
                  {sliceIndex === 0 ? "Outbound Flight" : "Return Flight"}
                </h3>
                {slice.segments.map((segment, segmentIndex) => (
                  <div key={segmentIndex} className="mb-4">
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

                    <div className="flex flex-col md:flex-row items-center justify-between text-gray-600">
                      <div className="text-center">
                        <p className="text-sm font-semibold">
                          {formatDateTime(segment.departing_at)}
                        </p>
                        <p className="text-sm font-medium">
                          {segment.origin?.iata_code}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-sm">
                          {calculateTotalDuration(segment, segment)}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">
                          {segment.passengers[0]?.cabin_class}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-semibold">
                          {formatDateTime(segment.arriving_at)}
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
              onClick={() => setIsPopupOpen(false)}
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

export default RoundTripFlightOfferCard;
