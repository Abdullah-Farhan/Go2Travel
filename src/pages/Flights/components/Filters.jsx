import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

const Filter = ({
  flights,
  setFilteredData,
  applyFilter,
  setApplyFilter,
  minPrice,
  maxPrice,
}) => {
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

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    //const [newMin, newMax] = getMinMaxPrice();
    setPriceRange([minPrice, maxPrice]);
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

  // const handlePriceChange = (event) => {
  //   const { name, value } = event.target;
  //   setPriceRange((prevRange) => {
  //     const newRange = [...prevRange];
  //     newRange[name === "min" ? 0 : 1] = Number(value);
  //     return newRange;
  //   });
  // };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    if (minPrice && maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

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

      <button
        onClick={() => {
          setApplyFilter(!applyFilter);
        }}
        className="px-10 shadow-lg py-4 rounded-lg mt-2 bg-custom-gradient text-white "
      >
        Apply Filters
      </button>

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
          {/* <input
            type="range"
            name="min"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <input
            type="range"
            name="max"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full mt-2"
          /> */}
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            getAriaLabel={() => "Price range"}
            min={minPrice || 0} // Fallback to 0 if minPrice is undefined
            max={maxPrice || 10000} // Maximum price from props
            step={1}
            sx={{
              color: "#525B31", // Sets the slider's primary color
              "& .MuiSlider-thumb": {
                backgroundColor: "#525B31", // Color for the thumb
                border: "2px solid #ffffff", // Optional: white border for contrast
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#D9D9D9", // Optional: lighter gray for the unselected range
              },
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span>
            {priceRange[0]} - {priceRange[1]}
          </span>
          <span>AUD</span>
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
              <span>
                {cabin
                  .replace(/_/g, " ") // Replace underscores with spaces
                  .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                {/* Capitalize first letter of each word */}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Filter;
