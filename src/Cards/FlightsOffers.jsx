import React, { useState } from "react";
import { DateTime } from "luxon";

const FlightOfferCard = ({ offer, data }) => {
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
  const { origin, destination, departing_at, operating_carrier, passengers } =
    segment;
  const finalSegment = firstSlice.segments[firstSlice.segments.length - 1];
  const { arriving_at } = finalSegment;
  const [showDeals, setShowDeals] = useState(false);

  const handleToggleDeals = () => {
    setShowDeals((prev) => !prev);
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/P(\d+D)?T?(\d+H)?(\d+M)?/);
    if (!match) return "Invalid duration";

    const days = match[1] ? match[1].toLowerCase() : null;
    const hours = match[2] ? match[2].toLowerCase() : "0h";
    const minutes = match[3] ? match[3].toLowerCase() : "0m";

    return `${days ? days : ""} ${hours} ${minutes}`.trim();
  };

  const formatCustomDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const convertTimeBetweenTimezones = (
    isoTime,
    originTimeZone,
    targetTimeZone
  ) => {
    return DateTime.fromISO(isoTime, { zone: originTimeZone })
      .setZone(targetTimeZone)
      .toFormat("EEE, MMM dd, HH:mm");
  };

  const calculateDuration = (
    departure,
    arrival,
    originTimeZone,
    destinationTimeZone
  ) => {
    const departureDate = DateTime.fromISO(departure, { zone: originTimeZone });
    const arrivalDate = DateTime.fromISO(arrival, {
      zone: destinationTimeZone,
    });
    const duration = arrivalDate.diff(departureDate, ["hours", "minutes"]);
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const totalStops = slices.reduce(
    (sum, slice) => sum + slice.segments.length - 1,
    0
  );

  const finalDestination =
    totalStops > 0
      ? slices[slices.length - 1].segments[
          slices[slices.length - 1].segments.length - 1
        ].destination.iata_code
      : destination.iata_code;

  return (
    <div className="mb-4 shadow-md">
      <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row relative">
        <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0 md:mr-4">
          <img
            src={operating_carrier.logo_symbol_url}
            alt={`${operating_carrier.name} logo`}
            className="w-24 h-24 rounded"
          />
        </div>

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

          <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
            <div className="text-center">
              <p className="text-sm font-semibold">
                {formatCustomDate(departing_at)}
              </p>
              <p className="text-sm font-medium">{origin.iata_code}</p>
              <p className="text-sm">
                Terminal{" "}
                {segment.origin_terminal ? segment.origin_terminal : "N/A"}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">
                {formatDuration(slices[0].duration)}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {passengers[0]?.cabin_class_marketing_name
                  ? passengers[0]?.cabin_class_marketing_name
                      .charAt(0)
                      .toUpperCase() +
                    passengers[0]?.cabin_class_marketing_name
                      .slice(1)
                      .toLowerCase()
                  : ""}
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
              <p className="text-sm">
                Terminal{" "}
                {segment.destination_terminal
                  ? segment.destination_terminal
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 text-gray-600 space-y-2 sm:space-y-0">
            <div>
              <p>Emissions: {total_emissions_kg} kg</p>
              <p>
                Refundable:{" "}
                {payment_requirements.requires_instant_payment ? "Yes" : "No"}
              </p>
              <button
                className={` py-2 rounded ${
                  offer.moreClasses && offer.moreClasses.length > 0
                    ? "text-blue-500 underline"
                    : "text-gray-600 cursor-not-allowed"
                }`}
                onClick={
                  offer.moreClasses && offer.moreClasses.length > 0
                    ? handleToggleDeals
                    : undefined
                }
              >
                {offer.moreClasses && offer.moreClasses.length > 0
                  ? "View All Deals >"
                  : "No Other Deals"}
              </button>
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

          <div className="flex flex-col items-start sm:items-end sm:mt-0 mt-3 text-right sm:text-left">
            <p className="text-xl font-semibold">
              {total_amount} {total_currency}
            </p>
            <p className="text-gray-500 text-sm">
              {base_amount} {total_currency} (Tax: {tax_amount} {total_currency}
              )
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
              <h2 className="text-3xl font-bold text-custom-green">
                Flight Details
              </h2>
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
                            {convertTimeBetweenTimezones(
                              segment.departing_at,
                              segment.origin.time_zone
                            )}
                          </p>
                          <p className="text-sm font-medium text-custom-green">
                            {segment.origin?.iata_code}
                          </p>
                          <p className="text-sm">
                            Terminal{" "}
                            {segment.origin_terminal
                              ? segment.origin_terminal
                              : "N/A"}
                          </p>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-gray-400 text-sm">
                            {calculateDuration(
                              segment.departing_at,
                              segment.arriving_at,
                              segment.origin.time_zone,
                              segment.destination.time_zone
                            )}
                          </span>
                          <span className="text-sm font-semibold text-gray-600">
                            {segment.passengers[0].cabin_class_marketing_name}
                          </span>
                        </div>

                        <div className="text-center">
                          <p className="text-sm font-semibold">
                            {convertTimeBetweenTimezones(
                              segment.arriving_at,
                              segment.destination.time_zone
                            )}
                          </p>
                          <p className="text-sm font-medium text-custom-green">
                            {segment.destination?.iata_code}
                          </p>
                          <p className="text-sm">
                            Terminal{" "}
                            {segment.destination_terminal
                              ? segment.destination_terminal
                              : "N/A"}
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
      {showDeals && offer.moreClasses && offer.moreClasses.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-2xl border p-6 max-w-lg w-full">
            <div className="w-full flex justify-between">
              <h4 className="text-lg text-custom-green font-semibold">
                Available Deals:
              </h4>
              <div
                className="rounded-full text-custom-green font-semibold text-lg cursor-pointer"
                onClick={handleToggleDeals}
              >
                x
              </div>
            </div>
            <ul className="space-y-2 max-h-96 mt-4 overflow-auto">
              {offer.moreClasses.map((deal, index) => (
                <>
                  {data.cabin_class.includes(deal.cabin_class) ? (
                    <>
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded shadow border"
                      >
                        <p className="text-custom-gold">
                          <strong className="text-custom-green">
                            Cabin Class:
                          </strong>{" "}
                          {deal.cabin_class === "premium_economy" ? "Premium Economy" : deal.cabin_class[0].toUpperCase() + deal.cabin_class.slice(1).toLowerCase()}
                        </p>
                        <p className="text-custom-gold">
                          <strong className="text-custom-green">
                            Fare Brand:
                          </strong>{" "}
                          {deal.fare_brand_name}
                        </p>
                        <p className="text-custom-gold">
                          <strong className="text-custom-green">Price:</strong>{" "}
                          {deal.total_amount} {offer.currency}
                        </p>
                        <a
                          href={`booking-link/${deal.booking_link}`}
                          className="mt-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book Now
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightOfferCard;
