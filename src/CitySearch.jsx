import React, { useContext, useState } from "react";
import axios from "axios";
import { FlightsContext } from "./Context/FlightsContext";

const AirportSearch = ( { type, destinationSetter, originSetter } ) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const { setSearchQuery, setToQuery } = useContext(FlightsContext)

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_API_KEY,
          client_secret: import.meta.env.VITE_API_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
      setError("Unable to authenticate with Amadeus API.");
    }
  };

  const handleInputChange = async (event) => {
    console.log(type);
    
    const query = event.target.value;
    setInputValue(query);    
    if (type == "from") {
      console.log("saving");
      destinationSetter(query)
    }
    else if ( type == "to") {
      originSetter(query)
    } 
    if (query.length > 2 && accessToken) {
      setIsLoading(true);
      setError(null);

      try {
        setTimeout(()=>{},1000)
        const response = await axios.get(
          `https://test.api.amadeus.com/v1/reference-data/locations`,
          {
            params: {
              subType: "AIRPORT,CITY",
              keyword: query,
              "page[limit]": 5,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSuggestions(
          response.data.data.map((location) => ({
            name: location.name,
            iataCode: location.iataCode,
            type: location.subType,
          }))
        );
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Error fetching suggestions");
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.name} (${suggestion.iataCode})`);
    setSuggestions([]);
    if (type == "from") {
      console.log("saving");
      destinationSetter(suggestion.iataCode)
    }
    else if ( type == "to") {
      originSetter(suggestion.iataCode)
    }    
  };

  React.useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <div className="airport-search">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="From Where"
        className="text-[#525B31] text-base font-montserrat outline-none w-full"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="suggestions-list mt-2 bg-custom-gradient">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 border-b cursor-pointer hover:bg-custom-gold"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <strong className="text-custom-green">{suggestion.name}</strong> ({suggestion.iataCode}) -{" "}
            {suggestion.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirportSearch;
