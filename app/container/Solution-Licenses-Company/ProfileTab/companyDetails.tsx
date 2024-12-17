import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const CompanyDetails = () => {
  return (
    <>
      <Box width={"50%"}>
        {/* Company Details------------------------------------------------------------------ */}

        <Typography variant="h5">Company Details</Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Company Name
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                XYZ Solar Limited
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Sharemundo Link ID
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
          </Box>
          {/* ------------------------------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Reg Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Tax Ref Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
          </Box>
          {/* -------------------------------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Website
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                www.company.name
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Tax Ref Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Bank Details------------------------------------------------------------------------------------- */}

        <Typography variant="h5" mt={4}>
          Bank Details
        </Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Bank Name
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                XYZ Bank
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Bank Address
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
          </Box>
          {/* ------------------------------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                IBAN
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                BIC
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
              </Typography>
            </Stack>
          </Box>
          {/* -------------------------------------------- */}
        </Stack>
      </Box>
    </>
  );
};

export default CompanyDetails;
