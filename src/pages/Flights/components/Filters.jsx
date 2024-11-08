import React, { useState, useEffect } from "react";

const Filter = ({ flights, filteredData, setFilteredData, applyFilter, setApplyFilter }) => {
  const getMinMaxPrice = () => {
    if (!flights || flights.length === 0) return [0, 1000];
    const prices = flights.map((flight) => parseFloat(flight.total_amount));
    return [Math.min(...prices), Math.max(...prices)];
  };

  const [stops, setStops] = useState([false, false, false]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedCabins, setSelectedCabins] = useState({
    economy: true,
    premium_economy: true,
    business: true,
    first: true,
  });

  const [minPrice, maxPrice] = getMinMaxPrice();
  const [priceRange, setPriceRange] = useState([0, 15000]);

  useEffect(() => {
    const [newMin, newMax] = getMinMaxPrice();
    setPriceRange([0, 10000]);
  }, [flights]);

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

  const handleStopChange = (index) => {
    setStops((prevStops) => {
      const newStops = [...prevStops];
      newStops[index] = !newStops[index];
      return newStops;
    });
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prevAirlines) =>
      prevAirlines.includes(airline)
        ? prevAirlines.filter((a) => a !== airline)
        : [...prevAirlines, airline]
    );
  };

  const handleCabinChange = (cabin) => {
    setSelectedCabins((prevCabins) => ({
      ...prevCabins,
      [cabin]: !prevCabins[cabin],
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[name === "min" ? 0 : 1] = Number(value);
      return newRange;
    });
  };

  useEffect(() => {
    // Initialize the stopsArray to be empty
    let stopsArray = [];

    if (stops[0]) stopsArray.push(0);
    if (stops[1]) stopsArray.push(1);
    if (stops[2]) stopsArray.push(2);

    if (stopsArray.length === 0) stopsArray = [];

    const data = {
      cabin_class: Object.keys(selectedCabins).filter(
        (cabin) => selectedCabins[cabin]
      ),
      base_amount: [priceRange[0], priceRange[1]],
      stops: stopsArray, 
      airlines: selectedAirlines,
    };

    setFilteredData(data);
  }, [stops, selectedAirlines, priceRange, selectedCabins]);

  return (
    <div>
      <section className="flex justify-center items-center text-custom-green text-xl font-bold h-12 border-b border-b-[#525B31]">
        <p>Filter By</p>
      </section>

      <button onClick={()=>{setApplyFilter(!applyFilter)}} className="px-10 py-4 rounded-lg mt-2 bg-custom-gradient text-white ">Apply Filters</button>

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

      <section className="text-custom-green py-2 border-b border-b-[#525B31] px-2 mt-2">
        <p className="font-semibold">Airlines</p>
        <div className="flex flex-col">
          {airlinesList.map((airline) => (
            <div
              key={airline}
              className="flex justify-between items-center mt-1"
            >
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

      <section className="text-custom-green py-2 border-b border-b-[#525B31] px-2 mt-2">
        <p className="font-semibold">Price Range (AUD)</p>
        <div className="flex flex-col mt-4">
          <input
            type="range"
            name="min"
            min={minPrice}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <input
            type="range"
            name="max"
            min={priceRange[0]}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full mt-2"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span>{priceRange[0]?.toFixed(2)} AUD</span>
          <span>{priceRange[1]?.toFixed(2)} AUD</span>
        </div>
      </section>

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
