import React, { useContext } from "react";
import DatePicker from "react-multi-date-picker";
import "./style.css";
import "react-multi-date-picker/styles/layouts/prime.css";
import { FlightsContext } from "../../Context/FlightsContext";

const CustomCalendar = () => {
  const { selectedDates, setSelectedDates, tripType } = useContext(FlightsContext);
  const today = new Date();
  console.log(tripType);
  

  const isValidDate = (date) => {
    return date >= today;
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates)) {
      const validDates = dates.filter(isValidDate).map(date => new Date(date)); // Ensure dates are Date objects
      setSelectedDates(validDates.length > 0 ? validDates : null);
    } else if (isValidDate(dates)) {
      setSelectedDates([new Date(dates)]); // Ensure single date is a Date object
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }} className="font-montserrat">
      {tripType === "oneWay" ? (
        <DatePicker
          placeholder="Select date"
          value={selectedDates}
          onChange={handleDateChange}
          numberOfMonths={1}
          weekDays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          hideYear
          className="custom-calendar"
          minDate={today}
        />
      ) : (
        <DatePicker
          placeholder="Add dates"
          value={selectedDates}
          onChange={handleDateChange}
          numberOfMonths={2} // Show two months for round trips
          weekDays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          hideYear
          className="custom-calendar"
          range
          minDate={today}
        />
      )}
      <div style={{
        width: '2px',
        backgroundColor: 'black',
        height: '100%',
        margin: '0 10px'
      }} />
    </div>
  );
};

export default CustomCalendar;
