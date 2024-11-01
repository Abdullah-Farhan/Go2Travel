import React, { useState, useEffect } from "react";
import Range  from "rc-slider"

const Filter = ({ flights, setFlights }) => {
  // Calculate min and max price from flights data
  const getMinMaxPrice = () => {
    if (!flights || flights.length === 0) return [0, 1000];
    const prices = flights.map(flight => parseFloat(flight.total_amount));
    return [Math.min(...prices), Math.max(...prices)];
  };

  const [stops, setStops] = useState([false, false, false]); // [No Stop, 1 Stop, 2+ Stops]
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedCabins, setSelectedCabins] = useState({
    economy: true,
    premium_economy: true,
    business: true,
    first: true,
  });

  // Initialize min and max price from flights
  const [minPrice, maxPrice] = getMinMaxPrice();
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Update price range when flights data changes
  useEffect(() => {
    const [newMin, newMax] = getMinMaxPrice();
    setPriceRange([newMin, newMax]);
  }, [flights]);

  // List of airlines for display
  const airlinesList = [
    "Air Arabia",
    "Emirates",
    "Etihad Airways",
    "flydubai",
    "Fly Jinnah",
    "Gulf Air",
    "Jazeera Airways",
    "PIA",
    "Qatar Airways",
    "Salam Air",
    "SAUDIA",
    "Turkish Airlines",
    "Multiple airlines",
  ];

  // Handle stop filter changes
  const handleStopChange = (index) => {
    setStops((prevStops) => {
      const newStops = [...prevStops];
      newStops[index] = !newStops[index];
      return newStops;
    });
  };

  // Handle airline filter changes
  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prevAirlines) =>
      prevAirlines.includes(airline)
        ? prevAirlines.filter((a) => a !== airline)
        : [...prevAirlines, airline]
    );
  };

  // Handle cabin class selection changes
  const handleCabinChange = (cabin) => {
    setSelectedCabins((prevCabins) => ({
      ...prevCabins,
      [cabin]: !prevCabins[cabin],
    }));
  };

  // Handle price range change
  const handlePriceChange = (event, index) => {
    const value = parseFloat(event.target.value);
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = value;

      // Ensure the min slider doesn’t exceed max and vice versa
      if (newRange[0] > newRange[1]) {
        newRange[index === 0 ? 1 : 0] = value;
      }

      return newRange;
    });
  };

  // Filter flights based on selected stops, airlines, cabin class, and price range
  useEffect(() => {
    const filteredFlights = flights?.filter((flight) => {
      // Check stops
      const stopsCount = flight.slices[0].segments.length - 1;
      const stopCondition =
        (stops[0] && stopsCount === 0) || // No Stop selected
        (stops[1] && stopsCount === 1) || // 1 Stop selected
        (stops[2] && stopsCount >= 2) || // 2+ Stops selected
        (!stops.includes(true)); // No stop filter selected

      // Check airlines
      const airlineCondition =
        selectedAirlines.length === 0 || // No airline filter selected
        selectedAirlines.includes(flight.owner.name);

      // Check price range
      const price = parseFloat(flight.total_amount);
      const priceCondition = price >= priceRange[0] && price <= priceRange[1];

      // Check cabin class
      const cabinClass = flight.slices[0].segments[0].passengers[0].cabin_class;
      const cabinCondition =
        (cabinClass === "economy" && selectedCabins.economy) ||
        (cabinClass === "premium_economy" && selectedCabins.premium_economy) ||
        (cabinClass === "business" && selectedCabins.business) ||
        (cabinClass === "first" && selectedCabins.first);

      return stopCondition && airlineCondition && priceCondition && cabinCondition;
    });

    setFlights(filteredFlights);
  }, [stops, selectedAirlines, priceRange, selectedCabins]);

  return (
    <div>
      <section className="flex justify-center items-center text-custom-green text-xl font-bold h-12 border-b border-b-[#525B31]">
        <p>Filter By</p>
      </section>

      {/* Stop Filter Section */}
      <section className="text-custom-green py-3 border-b border-b-[#525B31] px-2 mt-2">
        <p className="font-semibold">Stops</p>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="h-5 flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 mr-2"
              onChange={() => handleStopChange(0)}
              checked={stops[0]}
            />
            No Stop
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="h-5 flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 mr-2"
              onChange={() => handleStopChange(1)}
              checked={stops[1]}
            />
            1 Stop
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="h-5 flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 mr-2"
              onChange={() => handleStopChange(2)}
              checked={stops[2]}
            />
            2+ Stops
          </div>
        </div>
      </section>

      {/* Airline Filter Section */}
      <section className="text-custom-green py-2 border-b border-b-[#525B31] px-2 mt-2">
        <p className="font-semibold">Airlines</p>
        <div className="flex flex-col">
          {airlinesList.map((airline) => (
            <div key={airline} className="flex justify-between items-center mt-1">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2"
                onChange={() => handleAirlineChange(airline)}
                checked={selectedAirlines.includes(airline)}
              />
              <span>{airline}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Price Range Filter Section */}
      <section className="text-custom-green py-2 border-b border-b-[#525B31] px-2 mt-2">
      <p className="font-semibold">Price Range (AUD)</p>
      <div className="flex justify-between items-center mt-4">
        <Range
          className="w-full"
          value={priceRange}
          onChange={(values) => handlePriceChange({ target: { value: values }})} // Ensure the value is in the expected format
          min={minPrice}
          max={maxPrice}
          allowCross={false} // Prevent the handles from crossing each other
        />
      </div>
    </section>

      {/* Cabin Class Filter Section */}
      <section className="text-custom-green py-2 border-b border-b-[#525B31] px-2 mt-2">
        <p className="font-semibold">Cabin Class</p>
        <div className="flex flex-col">
          {Object.keys(selectedCabins).map((cabin) => (
            <div key={cabin} className="flex justify-between items-center mt-1">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2"
                onChange={() => handleCabinChange(cabin)}
                checked={selectedCabins[cabin]}
              />
              <span>{cabin.charAt(0).toUpperCase() + cabin.slice(1)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Filter;
