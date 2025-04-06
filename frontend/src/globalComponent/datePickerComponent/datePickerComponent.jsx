import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DatePickerComponent({ onDateChange }) {
  const [startDate, setStartDate] = useState(
    dayjs().subtract(3, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    onDateChange(startDate, endDate);
  }, []);

  const handleStartDateChange = (newDate) => {
    const formattedStartDate = newDate ? newDate.format("YYYY-MM-DD") : null;
    setStartDate(formattedStartDate);
    onDateChange(formattedStartDate, endDate);
  };

  const handleEndDateChange = (newDate) => {
    const formattedEndDate = newDate ? newDate.format("YYYY-MM-DD") : null;
    setEndDate(formattedEndDate);
    onDateChange(startDate, formattedEndDate);
  };

  // console.log("helooooo", startDate, endDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        sx={{ width: "100% " }}
      >
        <DatePicker
          label="Start Date"
          value={startDate ? dayjs(startDate) : null}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate ? dayjs(endDate) : null}
          onChange={handleEndDateChange}
          minDate={startDate ? dayjs(startDate) : null} // Ensure end date can't be before start date
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
