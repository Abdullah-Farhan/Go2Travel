import React from 'react';

const FlightOfferCard = ({ offer }) => {
    const {
        total_amount,
        total_currency,
        base_amount,
        tax_amount,
        total_emissions_kg,
        slices,
        payment_requirements,
    } = offer;

    // Extract details from the first slice
    const firstSlice = slices[0];
    const { origin, destination, departing_at, arriving_at, operating_carrier, passengers } = firstSlice.segments[0];

    // Format the departure and arrival times
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Calculate the flight duration
    const calculateDuration = (start, end) => {
        const durationMs = new Date(end) - new Date(start);
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h${minutes}m`;
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex">
            {/* Carrier Image */}
           <div className="flex-shrink-0 flex justify-center items-center mr-4">
                <img src={operating_carrier.logo_symbol_url} alt={`${operating_carrier.name} logo`} className="w-24 h-24 rounded" />
            </div>

            {/* Flight Information */}
            <div className="flex-grow relative">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-custom-green">{operating_carrier.name}</h2>
                        <p className="text-custom-green">{firstSlice.segments[0].marketing_carrier_flight_number}</p>
                    </div>
                </div>

                {/* Flight Details */}
                <div className="flex items-center justify-between text-gray-600 shadow-lg h-28 rounded-lg px-2 mt-2">
                    <div className="text-center">
                        <p className="text-sm font-semibold">{new Date(departing_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xl font-bold text-custom-gold">{formatTime(departing_at)}</p>
                        <p className="text-sm font-medium">{destination.iata_city_code}</p>
                    </div>

                    {/* Duration and Flight Class */}
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-sm">{calculateDuration(departing_at, arriving_at)}</span>
                        <span className="text-sm font-semibold text-gray-600">{passengers[0]?.cabin_class}</span>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-semibold">{new Date(arriving_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xl font-bold text-custom-gold">{formatTime(arriving_at)}</p>
                        <p className="text-sm font-medium">{origin.iata_city_code}</p>
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
                    <p className="text-xl font-semibold ">
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
        </div>
    );
};

export default FlightOfferCard;