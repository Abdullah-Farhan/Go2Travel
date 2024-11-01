import React, { useContext, useEffect, useState } from "react";
import FlightOfferCard from "../../Cards/FlightsOffers";
import { FlightsContext } from "../../Context/FlightsContext";
import axios from "axios";
import Filter from "./components/Filters";
import RoundTripFlightOfferCard from "../../Cards/FlightOffersRoundTrip";
import Pagination from "../../components/Pagination/Pagination"; // Ensure you have this component

const FlightOffersList = () => {
  const [response, setResponse] = useState(null);
  const { selectedDates, guest, searchQuery, toQuery, isSearched, tripType } =
    useContext(FlightsContext);
  const [departureDate, setDepartureDate] = useState(selectedDates[0]);
  const [returnDate, setReturnDate] = useState(selectedDates.length > 1 ? selectedDates[1]:null);

  const passengers = [];
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);

  for (let i = 0; i < guest.adults; i++) {
    passengers.push({
      type: "adult",
    });
  }

  if (guest.children > 0) {
    for (let i = 0; i < guest.children; i++) {
      passengers.push({
        type: "child",
      });
    }
  }

  if (guest.rooms > 0) {
    for (let i = 0; i < guest.rooms; i++) {
      passengers.push({
        type: "infant_without_seat",
      });
    }
  }

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

  // Effect to set the departure date from selectedDates
  useEffect(() => {
    if (selectedDates.length > 0) {
      const date = selectedDates[0]; // Ensure this is a Date object
      setDepartureDate(formatDate(date));
      if(selectedDates.length>1){ 
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
                    departure_date: departureDate, // Ensure this is formatted as "YYYY-MM-DD"
                  },
                ],
                passengers: passengers,
              }
            : {
                slices: [
                  {
                    origin: searchQuery,
                    destination: toQuery,
                    departure_date: departureDate, // Ensure this is formatted as "YYYY-MM-DD"
                  },
                  {
                    origin: toQuery,
                    destination: searchQuery,
                    departure_date: returnDate, // Ensure this is formatted as "YYYY-MM-DD"
                  },
                ],
                passengers: passengers,
              };

        console.log(requestData, tripType);

        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/flight-instances`,
          requestData
        );
        console.log(res);

        if (res) {
          setResponse(res.data.data.data.offers);
          setFlights(res?.data?.data?.data?.offers);
        }
      }  catch (error) {
        console.error("Error fetching flight offers:", error);
        if (error.response && error.response.status === 502) {
          setError("Error from server"); // Set specific error message for 502
        } else {
          setError("An unexpected error occurred."); // General error message
        }
      } finally {
        setLoading(false); // Set loading to false when request is done
      }
    };

    flightsApiRequest(); // Call the API request when dependencies change
  }, [isSearched]);

  // Calculate total pages
  const totalPages = Math.ceil((flights?.length || 0) / itemsPerPage);

  // Calculate which offers to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOffers = flights?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-32 flex flex-row justify-between">
      <div className="w-3/12 mx-2">
        <Filter setFlights={setFlights} flights={response} />
      </div>
      <div className="w-8/12">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center text-2xl">{error}</p> // Display error message
        ) : response && response.length > 0 ? (
          currentOffers.length > 0 ? (
            currentOffers.map((offer) => (
              tripType === "roundTrip" ? (
                <RoundTripFlightOfferCard key={offer.id} offer={offer} />
              ) : (
                <FlightOfferCard key={offer.id} offer={offer} />
              )
            ))
          ) : (
            <p className="text-center text-2xl">No results found</p>
          )
        ) : (
          <p className="text-center text-2xl">No results found</p>
        )}
        {totalPages > 1 && !error && currentOffers?.length>0 && (
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
