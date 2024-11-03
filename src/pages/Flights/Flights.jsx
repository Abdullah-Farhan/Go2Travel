import React, { useContext, useEffect, useState } from "react";
import FlightOfferCard from "../../Cards/FlightsOffers";
import { FlightsContext } from "../../Context/FlightsContext";
import axios from "axios";
import Filter from "./components/Filters";
import RoundTripFlightOfferCard from "../../Cards/FlightOffersRoundTrip";
import Pagination from "../../components/Pagination/Pagination"; // Ensure you have this component
import { toast } from "react-hot-toast";

const FlightOffersList = () => {
  const [response, setResponse] = useState(null);
  const { selectedDates, guest, searchQuery, toQuery, isSearched, tripType, loading, setLoading, error, setError, isSearchClicked } =
    useContext(FlightsContext);
  const [departureDate, setDepartureDate] = useState(selectedDates[0]);
  const [returnDate, setReturnDate] = useState(
    selectedDates.length > 1 ? selectedDates[1] : null
  );

  const [passengers, setPassengers] = useState([]); // Passengers as state
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [filterVisible, setFilterVisible] = useState(false); // State for filter visibility
  let newPassengers = [];

  // Populate passengers whenever the guest context changes
  useEffect(() => {
    console.log(guest);
    
    for (let i = 0; i < guest.adults; i++) {
      console.log("ran");
      
      newPassengers.push({ type: "adult" });
    }

    for (let i = 0; i < guest.children; i++) {
      newPassengers.push({ type: "child" });
    }

    for (let i = 0; i < guest.rooms; i++) {
      newPassengers.push({ type: "infant_without_seat" });
    }

    setPassengers(newPassengers);
    setTimeout(()=> {

    }, 1000)
    console.log(newPassengers);
     // Update the passengers state
  }, [guest]); 

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
                slices: [
                  {
                    origin: searchQuery,
                    destination: toQuery,
                    departure_date: departureDate,
                  },
                ],
                passengers: passengers,
              }
            : {
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
              };

        console.log(requestData);

        if (selectedDates.length > 1 && tripType === "roundTrip") {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/flight-instances`,
            requestData
          );
          if (res) {
            console.log(res)
            setResponse(res.data.data.data.offers);
            setFlights(res?.data?.data?.data?.offers);
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
            `${import.meta.env.VITE_BASE_URL}/api/flight-instances`,
            requestData
          );
          if (res) {
            console.log(res);
            setResponse(res?.data?.data?.data?.offers);
            setFlights(res?.data?.data?.data?.offers);
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
        setTimeout(()=>setLoading(false), 1000)
      }
    };

    flightsApiRequest(); // Call the API request when dependencies change
  }, [isSearched, passengers]); // Add passengers as a dependency

  // Calculate total pages
  const totalPages = Math.ceil((flights?.length || 0) / itemsPerPage);

  // Calculate which offers to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOffers =
    flights?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <Filter setFlights={setFlights} flights={response} />
          </div>
        )}
        {/* Always show the Filter component on larger screens */}
        <div className="hidden lg:block">
          <Filter setFlights={setFlights} flights={response} />
        </div>
      </div>
      <div className="w-full lg:w-8/12">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center text-2xl">{error}</p> // Display error message
        ) : response && response.length > 0 ? (
          currentOffers.length > 0 ? (
            currentOffers.map((offer) =>
              tripType === "roundTrip" && selectedDates.length === 2 && isSearchClicked ? (
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
        {totalPages > 1 && !error && currentOffers?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default FlightOffersList;
