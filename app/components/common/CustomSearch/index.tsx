"use client";
import React, { useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { CustomTextFieldProps } from "@/app/types/TextfieldProps";

const CustomSearchField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  helperText = "",
  required = false,
  placeholder = "Write Something ",
  startIcon = null,
  endIcon = null,
  onStartIconClick,
  onEndIconClick,
  onChange,
  width = "220px",
  height,
  ...rest
}) => {
  const [, setError] = useState(false);
  const [, setHelperText] = useState<string | undefined>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (required && !value) {
      setError(true);
      setHelperText("This field is required");
    } else {
      setError(false);
      setHelperText(undefined);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="subtitle1" sx={{ marginBottom: "6px" }}>
          {" "}
          {label}
        </Typography>
        <TextField
          variant={variant}
          required={required}
          helperText={helperText}
          onChange={handleChange}
          value={searchQuery}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                <span onClick={onStartIconClick} style={{ marginTop: "6px" }}>
                  {startIcon}
                </span>
              </InputAdornment>
            ) : null,
            endAdornment: endIcon ? (
              <InputAdornment position="end">
                <span onClick={onEndIconClick}>{endIcon}</span>
              </InputAdornment>
            ) : null,
          }}
          inputProps={{
            sx: {
              "&::placeholder": {
                fontSize: "14px",
                fontWeight: 400,
                color: "#667185",
              },
            },
          }}
          sx={{
            borderRadius: "6px",
            width: width,
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "1.4375em",
              color: "#667185",
              borderRadius: "6px",
              fontFamily: "Mulish, sans-serif",
              padding: "8px 12px",
              height: height || "47px",
              // boxShadow:
              //   "0px 4px 8px -2px rgba(0, 0, 0, 0.08), 0px 2px 4px -2px rgba(0, 0, 0, 0.04)",
              "& fieldset": {
                borderColor: "1px solid #D0D5DD",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
            },
          }}
          placeholder={placeholder}
          {...rest}
        />
      </Box>
    </>
  );
};

export default CustomSearchField;
