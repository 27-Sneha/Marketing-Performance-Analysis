import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonDateRangePicker from "../buttonDateRangePicker/buttonDateRangePicker";
import "./kpiCard.css";

const KpiCards = ({ kpi, onDateChange }) => {
  const [value, setValue] = useState([null, null]);
  const [open, setOpen] = useState(false);

  const handleCalendarOpen = () => {
    setOpen(true);
  };
  const handleCalendarClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);

    const formattedStartDate = newValue[0]
      ? newValue[0].format("YYYY-MM-DD")
      : null;
    const formattedEndDate = newValue[1]
      ? newValue[1].format("YYYY-MM-DD")
      : null;

    if (onDateChange) {
      onDateChange(kpi.id, [formattedStartDate, formattedEndDate]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card className="kpi-card-container">
        <CardHeader
          title={kpi.title}
          action={
            <ButtonDateRangePicker
              label={
                <IconButton
                  aria-label="calendar"
                  className="kpi-card-icon-container"
                  onClick={handleCalendarOpen}
                >
                  <CalendarMonth className="kpi-card-icon" />
                </IconButton>
              }
              value={value}
              onChange={handleDateChange}
              onClose={handleCalendarClose}
              open={open}
            />
          }
          className="kpi-card-header"
        />
        <CardContent>
          <Typography fontSize={{ lg: "50px" }} className="kpi-card-content">
            {kpi.value}
          </Typography>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default KpiCards;
