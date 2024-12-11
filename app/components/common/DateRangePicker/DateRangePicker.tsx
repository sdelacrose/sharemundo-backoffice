import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";

interface DateRangePickerComponentProps {
  value?: DateRange<Dayjs>;
  onDateChange?: (dateRange: DateRange<Dayjs>) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  value,
  onDateChange,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  useEffect(() => {
    const storedDateRange = localStorage.getItem("dateRange");
    if (storedDateRange) {
      const parsedDateRange = JSON.parse(storedDateRange);
      const [start, end] = parsedDateRange;
      setSelectedDateRange([
        start ? dayjs(start) : null,
        end ? dayjs(end) : null,
      ]);
    } else if (value) {
      setSelectedDateRange(value);
    }
  }, [value]);

  const handleDateRangeChange = (newDateRange: DateRange<Dayjs>) => {
    setSelectedDateRange(newDateRange);

    const serializedDateRange = JSON.stringify([
      newDateRange[0] ? newDateRange[0].toISOString() : null,
      newDateRange[1] ? newDateRange[1].toISOString() : null,
    ]);
    localStorage.setItem("dateRange", serializedDateRange);

    if (onDateChange) {
      onDateChange(newDateRange);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        value={selectedDateRange}
        onChange={handleDateRangeChange}
        slots={{ textField: TextField }}
        slotProps={{
          textField: ({ position }) => ({
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            },
            sx: {
              maxWidth: "100%",
              borderRadius: "6px",
              backgroundColor: "#FFF",
              boxShadow:
                "0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)",
              "& .MuiOutlinedInput-root": {
                height: "54px",
              },
            },
          }),
        }}
      />
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
