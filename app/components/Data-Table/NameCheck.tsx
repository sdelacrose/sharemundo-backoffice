import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
// import Actions from './Actions';
import { CustomCellRendererProps } from "ag-grid-react";
import productImage from "../../assets/images/header.png";
import CustomCheckbox from "../common/CustomCheckBox";
interface ActiveUserNameProps extends CustomCellRendererProps {
  shouldRenderActions?: boolean;
  shouldRenderImage?: boolean;
}

const NameCheck: React.FC<ActiveUserNameProps> = (params) => {
  const { shouldRenderImage } = params;

  const name =
    params.data?.product_name ||
    params.data?.display_name ||
    params.data?.name ||
    "Business Basic";

  // const productImage = params.data?.image || "";

  // const [checked, setChecked] = useState<boolean>(
  //   params.data?.checked || false
  // );

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = event.target.checked;
  //   setChecked(isChecked);
  //   if (params.data) {
  //     params.data.checked = isChecked;
  //   }
  //   if (params.node && params.api) {
  //     params.api.refreshCells({ rowNodes: [params.node] });
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "160px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: shouldRenderImage ? "8px" : "10px",
        }}
      >
        <Box mr={-2}> 
          <CustomCheckbox />
        </Box>
        <Image src={productImage} alt="Product Image" />
        <Typography variant="body2" sx={{  fontSize: "14px" }}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default NameCheck;
