import React, { useEffect, useState } from "react";
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

  const [filter, setFilter] = useState(data);

  useEffect(() => {
    setFilter(data);
  }, [offer]);

  const firstSlice = slices[0];
  const secondSlice = slices[1];

  // Calculate stops for outbound and return flights separately
  const outboundStops = firstSlice ? firstSlice?.segments.length - 1 : 0;
  const returnStops = secondSlice ? secondSlice?.segments.length - 1 : 0;

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

  const convertTimeBetweenTimezones = (date) => {
    return DateTime.fromISO(date).toFormat("EEE, dd MMM HH:mm");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row relative">
      {/* Carrier Image */}
      <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0 md:mr-4">
        <img
          src={firstSlice?.segments[0]?.operating_carrier?.logo_symbol_url}
          alt={`${firstSlice?.segments[0]?.operating_carrier?.name} logo`}
          className="w-24 h-24 rounded"
        />
      </div>

      {/* Flight Information */}
      <div className="flex-grow relative">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-custom-green">
              {firstSlice?.segments[0]?.operating_carrier?.name}
            </h2>
            <p className="text-custom-green">
              {firstSlice?.segments[0]?.marketing_carrier_flight_number}
            </p>
          </div>
        </div>

        {/* Outbound Flight */}
        <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(firstSlice?.segments[0]?.departing_at)}
            </p>
            <p className="text-sm font-medium">
              {firstSlice?.segments[0]?.origin?.iata_code}
            </p>
            <p className="text-sm">
              Terminal{" "}
              {firstSlice?.segments[0]?.origin_terminal
                ? firstSlice?.segments[0]?.origin_terminal
                : "N/A"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">
              {formatDuration(firstSlice.duration)}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {firstSlice?.segments.find((segment) =>
                filter?.cabin_class.includes(segment?.passengers?.[0]?.cabin_class)
              )?.passengers?.[0]?.cabin_class}
            </span>
            {outboundStops > 0 && (
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-500 text-xs mt-1"
              >
                {outboundStops} stop{outboundStops > 1 ? "s" : ""}
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(
                firstSlice.segments[firstSlice.segments.length - 1]?.arriving_at
              )}
            </p>
            <p className="text-sm font-medium">
              {
                firstSlice.segments[firstSlice.segments.length - 1]?.destination
                  ?.iata_code
              }
            </p>
            <p className="text-sm">
              Terminal{" "}
              {firstSlice.segments[firstSlice.segments.length - 1]
                ?.destination_terminal
                ? firstSlice.segments[firstSlice.segments.length - 1]
                    .destination_terminal
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Return Flight */}
        <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(secondSlice?.segments[0]?.departing_at)}
            </p>
            <p className="text-sm font-medium">
              {secondSlice?.segments[0]?.origin?.iata_code}
            </p>
            <p className="text-sm">
              Terminal{" "}
              {secondSlice.segments[0].origin_terminal
                ? secondSlice.segments[0].origin_terminal
                : "N/A"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">
              {formatDuration(secondSlice.duration)}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {secondSlice?.segments.find((segment) =>
                filter?.cabin_class.includes(segment?.passengers?.[0]?.cabin_class)
              )?.passengers?.[0]?.cabin_class}
            </span>
            {returnStops > 0 && (
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-500 text-xs mt-1"
              >
                {returnStops} stop{returnStops > 1 ? "s" : ""}
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold">
              {formatCustomDate(
                secondSlice.segments[secondSlice.segments.length - 1]
                  ?.departing_at
              )}
            </p>
            <p className="text-sm font-medium">
              {
                secondSlice.segments[secondSlice.segments.length - 1]
                  ?.destination?.iata_code
              }
            </p>
            <p className="text-sm">
              Terminal{" "}
              {secondSlice.segments[secondSlice.segments.length - 1]
                ?.destination_terminal
                ? secondSlice.segments[secondSlice.segments.length - 1]
                    .destination_terminal
                : "N/A"}
            </p>
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
            <p
              onClick={handleToggleDeals}
              className={`${
                offer.moreClasses.length > 0
                  ? "text-blue-500 underline cursor-pointer"
                  : "text-gray-400"
              }`}
            >
              {offer.moreClasses.length > 0 ? "View All Deals" : "No Deals"}
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
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 max-h-[95vh] overflow-auto no-scrollbar">
            <div className="w-full flex justify-between">
              <h2 className="text-3xl font-bold text-custom-green">
                Flight Details
              </h2>
              <button
                className="text-xl font-semibold text-custom-green"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
            </div>
            {/* Outbound Stops */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-custom-gold">
                Outbound Flight
              </h3>
              {firstSlice?.segments.map((segment, segmentIndex) => (
                <div
                  key={segmentIndex}
                  className="mb-4 border-b-black border-b-[2px] pb-2"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-custom-green">
                        {segment?.operating_carrier?.name}
                      </h2>
                      <p className="text-custom-green">
                        Flight {segment?.marketing_carrier_flight_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        {formatCustomDate(segment?.departing_at)}
                      </p>
                      <p className="text-sm font-medium">
                        {segment?.origin?.iata_code}
                      </p>
                      <p className="text-sm">
                        Terminal{" "}
                        {segment?.origin_terminal
                          ? segment?.origin_terminal
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-gray-400 text-sm">
                        {formatDuration(segment?.duration)}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {segment?.passengers[0]?.cabin_class}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        {formatCustomDate(segment?.arriving_at)}
                      </p>
                      <p className="text-sm font-medium">
                        {segment?.destination.iata_code}
                      </p>
                      <p className="text-sm">
                        Terminal{" "}
                        {segment?.destination_terminal
                          ? segment?.destination_terminal
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Return Stops */}
            {secondSlice && (
              <div className="mb-4">
                <h3 className="text-xl font-bold text-custom-gold">
                  Return Flight
                </h3>
                {secondSlice.segments.map((segment, segmentIndex) => (
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
                          {formatCustomDate(segment.departing_at)}
                        </p>
                        <p className="text-sm font-medium">
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
                          {formatDuration(segment.duration)}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">
                          {segment.passengers[0]?.cabin_class}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-semibold">
                          {formatCustomDate(segment.arriving_at)}
                        </p>
                        <p className="text-sm font-medium">
                          {segment.destination.iata_code}
                        </p>
                        <p className="text-sm">
                          Terminal{" "}
                          {segment?.destination_terminal
                            ? segment?.destination_terminal
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
                  {data.cabin_class.includes(deal?.cabin_class) ? (
                    <>
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded shadow border"
                      >
                        <p className="text-custom-gold">
                          <strong className="text-custom-green">
                            Cabin Class:
                          </strong>{" "}
                          {deal?.cabin_class === "premium_economy"
                            ? "Premium Economy"
                            : deal?.cabin_class[0].toUpperCase() +
                              deal?.cabin_class.slice(1).toLowerCase()}
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
