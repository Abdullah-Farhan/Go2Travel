import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "./style.css"
import "react-multi-date-picker/styles/layouts/prime.css"; // Prime layout

const CustomCalendar = () => {
  const [value, setValue] = useState(null);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }} className="font-montserrat">
      <DatePicker
        placeholder="Add dates"
        value={value}
        onChange={setValue}
        numberOfMonths={2}
        weekDays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        hideYear
        className="custom-calendar"
        range
      />
      <div style={{
        width: '2px',
        backgroundColor: 'black', // Color of the vertical line
        height: '100%', // Adjust height as needed
        margin: '0 10px' // Space between calendars and line
      }} />
    </div>
  );
};



export default CustomCalendar;
