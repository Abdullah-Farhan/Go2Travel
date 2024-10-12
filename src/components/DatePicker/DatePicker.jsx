import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "./style.css"
import "react-multi-date-picker/styles/layouts/prime.css"; // Prime layout

const CustomCalendar = () => {
  const [value, setValue] = useState(null);

  return (
    <div style={{outline: "none", boxShadow: "none", border: "none", display: "flex", justifyContent: "center" }} className="font-montserrat border-none outline-none shadow-none">
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
    </div>
  );
};



export default CustomCalendar;
