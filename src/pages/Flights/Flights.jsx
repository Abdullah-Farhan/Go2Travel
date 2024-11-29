import React, { useContext, useEffect, useState } from "react";
import FlightOfferCard from "../../Cards/FlightsOffers";
import { FlightsContext } from "../../Context/FlightsContext";
import axios from "axios";
import Filter from "./components/Filters";
import RoundTripFlightOfferCard from "../../Cards/FlightOffersRoundTrip";
import Pagination from "../../components/Pagination/Pagination"; // Ensure you have this component
import { toast } from "react-hot-toast";
import { da } from "date-fns/locale";

const FlightOffersList = () => {
  const [response, setResponse] = useState(null);
  const [id, setId] = useState();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(null);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const {
    selectedDates,
    guest,
    searchQuery,
    toQuery,
    isSearched,
    tripType,
    loading,
    setLoading,
    error,
    setError,
    isSearchClicked,
  } = useContext(FlightsContext);
  const [departureDate, setDepartureDate] = useState(selectedDates[0]);
  const [returnDate, setReturnDate] = useState(
    selectedDates.length > 1 ? selectedDates[1] : null
  );
  const [data, setFilteredData] = useState();
  const [totalPages, setTotalPages] = useState();
  const [selectedSortValue, setSelectedSortValue] = useState("")

  const [passengers, setPassengers] = useState([{ type: "adult" }]);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items to display per page
  const [filterVisible, setFilterVisible] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [pg, setPg] = useState(1);
  let newPassengers = [];

  useEffect(() => {
    console.log(data);
    console.log(pg);
    fetchPaginatedData();
  }, [applyFilter]);

  useEffect(() => {
    console.log(guest);

    if (guest.adults > 1) {
      for (let i = 0; i < guest.adults - 1; i++) {
        console.log("ran");

        newPassengers.push({ type: "adult" });
      }
    }

    for (let i = 0; i < guest.children; i++) {
      newPassengers.push({ type: "child" });
    }

    for (let i = 0; i < guest.rooms; i++) {
      newPassengers.push({ type: "infant_without_seat" });
    }

    if (newPassengers.length > 0) {
      setPassengers(newPassengers);
    }
    console.log(newPassengers);

    setTimeout(() => {}, 1000);
    console.log(newPassengers);
  }, [guest]);

  const fetchPaginatedData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(departureDate, searchQuery, toQuery, tripType);
      const obj = { data };
      console.log(obj);

      if (selectedDates.length > 1 && tripType === "roundTrip") {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}flights/list`,
          obj,
          {
            params: {
              id: id,
              ...(limit && { limit: limit }),
              ...(page && { page: pg }),
            },
          }
        );
        if (res) {
          console.log("1:",res);
          setResponse(res.data.data.data);
          setTimeout(() => setLoading(false), 2500);
          setFlights(res?.data?.data?.data);
          setMinPrice(res?.data?.data?.meta.minPrice);
          setMaxPrice(res?.data?.data?.meta.maxPrice);
          setPriceRange(
            res?.data?.data?.meta.minPrice,
            res?.data?.data?.meta.maxPrice
          );
        }
      } else if (tripType === "roundTrip") {
        toast.error("Please select Complete Date and Both Locations");
      }
      if (
        selectedDates.length <= 2 &&
        selectedDates.length !== 0 &&
        tripType === "oneWay"
      ) {
        console.log(id, limit, page);
        setResponse(null);
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}flights/list`,
          obj,
          {
            params: {
              id: id,
              ...(limit && { limit: limit }),
              ...(page && { page: pg }),
            },
          }
        );
        if (res) {
          console.log(res);

          console.log("2:", res.data.data.data);
          setResponse(res.data.data.data);
          setTimeout(() => setLoading(false), 2500);
          setFlights(res?.data?.data?.data);
          setMinPrice(res?.data?.data?.meta.minPrice);
          setMaxPrice(res?.data?.data?.meta.maxPrice);
          setPriceRange(
            res?.data?.data?.meta.minPrice,
            res?.data?.data?.meta.maxPrice
          );
        }
      } else if (tripType === "oneWay" && selectedDates.length > 1) {
        toast.error("Please select Complete Departure date only");
      }
    } catch (error) {
      console.error("Error fetching flight offers:", error);
      // if (error.response && error.response.status === 502) {
      //   setError("Error from server"); // Set specific error message for 502
      // } else {
      //   setError("An unexpected error occurred."); // General error message
      // }
    } finally {
      setTimeout(() => setLoading(false), 2500);
    }
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      console.error("Invalid date object");
      return null; // Return null if the date is invalid
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedDates.length > 0) {
      const date = selectedDates[0]; // Ensure this is a Date object
      setDepartureDate(formatDate(date));
      if (selectedDates.length > 1) {
        setReturnDate(formatDate(selectedDates[1]));
      }
    }
  }, [selectedDates]);

  useEffect(() => {
    const flightsApiRequest = async () => {
      setLoading(true); // Set loading to true when starting the request
      setError(null);
      try {
        console.log(departureDate, searchQuery, toQuery, tripType);

        const requestData =
          tripType === "oneWay"
            ? {
                data: {
                  slices: [
                    {
                      origin: searchQuery,
                      destination: toQuery,
                      departure_date: departureDate,
                    },
                  ],
                  passengers: passengers,
                },
              }
            : {
                data: {
                  slices: [
                    {
                      origin: searchQuery,
                      destination: toQuery,
                      departure_date: departureDate,
                    },
                    {
                      origin: toQuery,
                      destination: searchQuery,
                      departure_date: returnDate,
                    },
                  ],
                  passengers: passengers,
                },
              };

        console.log(requestData);

        if (selectedDates.length > 1 && tripType === "roundTrip") {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}flights/createOfferRequest`,
            requestData
          );
          if (res) {
            console.log(res);
            setResponse("3:", res.data.data.data);
            setTimeout(() => setLoading(false), 2500);
            setFlights(res?.data?.data?.data);
            setMinPrice(res?.data?.data?.meta.minPrice);
            setMaxPrice(res?.data?.data?.meta.maxPrice);
            setPriceRange(
              res?.data?.data?.meta.minPrice,
              res?.data?.data?.meta.maxPrice
            );
          }
        } else if (tripType === "roundTrip") {
          toast.error("Please select Complete Date and Both Locations");
        }
        if (
          selectedDates.length <= 2 &&
          selectedDates.length !== 0 &&
          tripType === "oneWay"
        ) {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}flights/createOfferRequest`,
            requestData
          );
          if (res) {
            console.log(res);
            setTotalPages(res.data?.data?.meta?.totalPages);
            setId(res.data.data.meta.id);
            setLimit(res.data.data.meta.limit);
            console.log("4:", res.data.data.data);
            setResponse(res?.data?.data?.data);
            setTimeout(() => setLoading(false), 2500);
            setFlights(res?.data?.data?.data);
            console.log(totalPages);
            setMinPrice(res.data.data.meta.minPrice);
            setMaxPrice(res.data.data.meta.maxPrice);
            console.log(
              res.data.data.meta.minPrice,
              res.data.data.meta.maxPrice
            );
            setPriceRange(
              res?.data?.data?.meta.minPrice,
              res?.data?.data?.meta.maxPrice
            );
          }
        } else if (tripType === "oneWay" && selectedDates.length > 1) {
          toast.error("Please select Complete Departure date only");
        }
      } catch (error) {
        console.error("Error fetching flight offers:", error);
        if (error.response && error.response.status === 502) {
          setError("Error from server"); // Set specific error message for 502
        } else {
          setError("An unexpected error occurred."); // General error message
        }
      } finally {
        setTimeout(() => setLoading(false), 2500);
      }
    };

    flightsApiRequest(); // Call the API request when dependencies change
  }, [isSearched]);

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
    setPage(pages);
    fetchPaginatedData();
    setPg(pages);
  };

  const setFilters = (data) => {
    setFilteredData(data);
  };

  const handleOrderByFlights = async (sortBy) => {
    setSelectedSortValue(sortBy)
    
    if (response.length > 0) {
      setLoading(true); 
      setError(null); 
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}flights/orderBy`,
          {
            params: {
              id,
              sortBy,
            },
          }
        );

        console.log(res);
        
        if (res) {
          const results = Object.values(res.data.data);
          setResponse(results)
          
        } else {
          setError("No sorted flights found");
        }
      } catch (error) {
        console.error("Error fetching sorted flights:", error);
        setError("Failed to fetch sorted flights."); 
      } finally {
        setTimeout(() => {
          console.log(response);
          setLoading(false);
        }, 2500);
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 mt-32 flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-3/12 mx-2">
        {/* Button to show filter on mobile */}
        <div className="block lg:hidden">
          <button
            className="bg-custom-gradient text-white p-2 rounded"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            {filterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
        {/* Filter component shown as a card on mobile */}
        {filterVisible && (
          <div className="bg-white shadow-md rounded-lg p-4 lg:hidden">
            <Filter
              setFlights={setFlights}
              flights={response}
              filteredData={data}
              setFilteredData={setFilters}
              applyFilter={applyFilter}
              setApplyFilter={setApplyFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        )}
        {/* Always show the Filter component on larger screens */}
        <div className="hidden lg:block">
          <Filter
            setFlights={setFlights}
            flights={response}
            filteredData={data}
            setFilteredData={setFilters}
            applyFilter={applyFilter}
            setApplyFilter={setApplyFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
      </div>
      <div className="w-full lg:w-8/12">
        <div className="w-full h-auto flex justify-between mb-4">
          <button
            className={`h-24 shadow-lg w-3/12 text-custom-green flex items-center justify-center rounded-lg hover:border border-custom-gold border-opacity-50 ${selectedSortValue === "best"? "border-2 border-custom-gold": ""}`}
            onClick={() => handleOrderByFlights("best")}
          >
            Best
          </button>
          <button
            className={`h-24 shadow-lg w-3/12 text-custom-green flex items-center justify-center rounded-lg hover:border border-custom-gold border-opacity-50 ${selectedSortValue === "cheapest"? "border-2 border-custom-gold": ""}`}
            onClick={() => handleOrderByFlights("cheapest")}
          >
            Cheapest
          </button>
          <button
            className={`h-24 shadow-lg w-3/12 text-custom-green flex items-center justify-center rounded-lg hover:border border-custom-gold border-opacity-50 ${selectedSortValue === "quickest"? "border-2 border-custom-gold": ""}`}
            onClick={() => handleOrderByFlights("quickest")}
          >
            Quickest
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center text-2xl">{error}</p> // Display error message
        ) : response && response.length > 0 ? (
          response.length > 0 ? (
            response.map((offer) =>
              tripType === "roundTrip" &&
              selectedDates.length === 2 &&
              isSearchClicked ? (
                <RoundTripFlightOfferCard key={offer.id} offer={offer} />
              ) : (
                <FlightOfferCard key={offer.id} offer={offer} />
              )
            )
          ) : (
            <p className="text-center text-2xl">No results found</p>
          )
        ) : (
          <p className="text-center text-2xl">No results found</p>
        )}
        {totalPages > 1 && !error && response?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            id={id}
            limit={limit}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default FlightOffersList;
