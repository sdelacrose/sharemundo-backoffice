import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

const CustomDateTimePicker = ({
  value,
  width,
  label,
  onDateChange,
  disabled = false,
  disablePast = false,
}: {
  value?: Dayjs | null;
  width?: string;
  label?: string;
  onDateChange: (date: string | null) => void;
  disabled?: boolean;
  disablePast?: boolean;
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    value ? value : null
  );

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD HH:mm:ss"); // Format date as YYYY-MM-DD HH:mm:ss
      onDateChange(formattedDate); // Pass formatted date to parent
    } else {
      onDateChange(null); // Pass null if date is cleared
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        label={label}
        disabled={disabled}
        disablePast={disablePast}
        sx={{
          width: width || "100%",
          height: "40px",
          fontSize: "14px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          "& .MuiInputBase-root": {
            height: "40px",
            color: "#344054",
            fontWeight: "400",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1px solid #D0D5DD",
            },
            "&:hover fieldset": {
              borderColor: "#BDBDBD",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
