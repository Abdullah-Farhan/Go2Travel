import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';

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
    const { origin, destination, departing_at, arriving_at, operating_carrier, passengers } = segment;

    const formatDateTime = (date) => format(parseISO(date), 'eee, MMM dd, HH:mm');

    const calculateDuration = (departure, arrival) => {
        const departureDate = new Date(departure);
        const arrivalDate = new Date(arrival);
        const durationMs = arrivalDate - departureDate;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    const totalStops = slices.reduce((sum, slice) => sum + slice.segments.length - 1, 0);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row relative">
            {/* Carrier Image */}
            <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0 md:mr-4">
                <img src={operating_carrier.logo_symbol_url} alt={`${operating_carrier.name} logo`} className="w-24 h-24 rounded" />
            </div>

            {/* Flight Information */}
            <div className="flex-grow relative">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-lg font-bold text-custom-green">{operating_carrier.name}</h2>
                        <p className="text-custom-green">{segment.marketing_carrier_flight_number}</p>
                    </div>
                </div>

                {/* Flight Details */}
                <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
                    <div className="text-center">
                        <p className="text-sm font-semibold">{formatDateTime(departing_at)}</p>
                        <p className="text-sm font-medium">{origin.iata_city_code}</p>
                    </div>

                    {/* Duration and Flight Class */}
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-sm">{calculateDuration(departing_at, arriving_at)}</span>
                        <span className="text-sm font-semibold text-gray-600">{passengers[0]?.cabin_class}</span>
                        {totalStops > 0 && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="text-blue-500 text-xs mt-1"
                            >
                                {totalStops} {totalStops > 1 ? 'stops' : 'stop'}
                            </button>
                        )}
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-semibold">{formatDateTime(arriving_at)}</p>
                        <p className="text-sm font-medium">{destination.iata_city_code}</p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-3 text-gray-600">
                    <p>Emissions: {total_emissions_kg} kg</p>
                    <p>Refundable: {payment_requirements.requires_instant_payment ? 'Yes' : 'No'}</p>
                </div>
                <div className="mt-2">
                    <p className={`text-sm ${payment_requirements.requires_instant_payment ? 'text-red-600' : 'text-green-600'}`}>
                        {payment_requirements.requires_instant_payment ? 'Requires Instant Payment' : 'Payment not required immediately'}
                    </p>
                </div>

                {/* Price Tag and Book Now Button */}
                <div className="absolute bottom-0 right-4 text-right">
                    <p className="text-xl font-semibold">
                        {total_amount} {total_currency}
                    </p>
                    <p className="text-gray-500 text-sm">
                        Base: {base_amount} {total_currency} (Tax: {tax_amount} {total_currency})
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

                                        <div className="flex items-center justify-between text-gray-600">
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
                                                    {calculateDuration(segment.departing_at, segment.arriving_at)}
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
