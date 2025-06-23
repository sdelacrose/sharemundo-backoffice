"use client";
import React, { forwardRef } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import styles from "./index.module.scss";

const CustomTextField: React.FC<any> = forwardRef(
  (
    {
      label,
      variant = "outlined",
      helperText = "",
      type = "text",
      placeholder = "Write Something ",
      error = false,
      startIcon = null,
      endIcon = null,
      onStartIconClick,
      onEndIconClick,
      height,
      accept,
      width,
      background,
      fixedEndText,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <Box sx={{ width: "100%", marginTop: "-4px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "6px" }}>
          {label}
        </Typography>
        <TextField
          variant={variant}
          error={error}
          helperText={helperText}
          inputRef={ref}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          InputProps={{
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                <span onClick={onStartIconClick} className={styles.starIcon}>
                  {startIcon}
                </span>
              </InputAdornment>
            ) : null,
            endAdornment:
              endIcon || fixedEndText ? (
                <InputAdornment position="end">
                  {endIcon && (
                    <span onClick={onEndIconClick} className={styles.icon}>
                      {endIcon}
                    </span>
                  )}
                  {fixedEndText && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={400}
                      color="#101928"
                      sx={{
                        marginLeft: endIcon ? "8px" : "0",
                      }}
                    >
                      {fixedEndText}
                    </Typography>
                  )}
                </InputAdornment>
              ) : null,
          }}
          inputProps={{
            accept: type === "file" ? accept : undefined,
            ...(type !== "file" && { value: rest.value }),
            sx: {
              "&::placeholder": {
                color: "#667185",
                fontSize: "14px",
                fontWeight: 500,
              },
            },
          }}
          sx={{
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "1.4375em",
              color: "#344054",
              borderRadius: "6px",
              fontFamily: "Mulish, sans-serif",
              padding: "8px -8px",
              height: height || "100%",
              width: width || "100%",
              background: background || "transparent",
              "& fieldset": {
                borderColor: "1px solid #D0D5DD",
                borderRadius: "6px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
            },
          }}
          {...rest}
        />
      </Box>
    );
  }
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
