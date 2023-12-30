"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ getDate }: any) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    console.log("newValue:", newValue);
  };

  return (
    <div className="relative rounded-xl border border-[#607D8B]">
      <Datepicker
        value={value}
        asSingle={true}
        placeholder="Select the date"
        onChange={(e) => {
          handleValueChange(e);
          getDate(e);
        }}
        inputName="date"
        inputClassName="placeholder:text-black text-black bg-gray-50 p-3 w-full rounded-xl"
        primaryColor="blue"
        displayFormat="DD/MM/YYYY"
      />
    </div>
  );
};
export default DatePicker;
