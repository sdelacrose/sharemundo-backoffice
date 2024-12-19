import { Box, Typography } from "@mui/material";
import { IHeaderParams } from "ag-grid-community";
import CustomCheckbox from "../common/CustomCheckBox";

export const HeaderCheck = (params: IHeaderParams) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "-12px",
        }}
      >
        <CustomCheckbox />
        <Typography sx={{ fontSize: "14px",ml:"-8px" }} variant="body2">
          {params.displayName}
        </Typography>
      </Box>
    </Box>
  );
};
