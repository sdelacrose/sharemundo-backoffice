import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const SelectDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              placeholder: "Select dates",

              sx: {
                width: "160px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                border: "1px solid #D0D5DD",
                color: "#344054",
                fontSize: "14px",
                fontWeight: "400",
                // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  paddingLeft: "10px",
                  fontSize: "14px",
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
              },
              inputProps: {
                style: {
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#344054",
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SelectDatePicker;
