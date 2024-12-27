import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";

interface BlockBulkCustomerDrawerProps {
  open: boolean;
  handleClose: () => void;
  handleBlock: () => void;
  selectedUsers: { id: number; name: string }[]; // Pass selected user details
}

const BlockBulkCustomerDrawer: React.FC<BlockBulkCustomerDrawerProps> = ({
  open,
  handleClose,
  handleBlock,
  selectedUsers,
}) => {

  const sortedUsers = [...selectedUsers].sort((a, b) => a.id - b.id);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "43%",
            padding: "57px",
            backgroundColor: "white",
            height: "100vh",
            boxShadow: "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
            overflowY: "auto",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "690px",
            position: "relative",
          }}
        >
          <Stack gap={3}>
          <Typography variant="h3" letterSpacing={"0.4px"}>
              Block Bulk Customers?
            </Typography>
            <Typography variant="caption" fontSize={14} color="#667185">
              List of Customers:
            </Typography>
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingLeft: "8px",
              }}
            >
              {sortedUsers.map((user) => (
                <Box 
                  key={user.id} 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    mb: 1
                  }}
                >
                  <Typography
                    variant="body2"
                    color="#667185"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',

                      '&::before': {
                        content: '"•"',
                        marginRight: '8px',
                        fontSize: '12px',
                      }
                    }}
                  >
                    {user.name || `Customer ID: ${user.id}`}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <CustomButton
                variant="outlined"
                fontSize="16px"
                onClick={handleClose}
                padding="16px 24px"
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="contained"
                fontSize="16px"
                padding="16px 24px"
                onClick={handleBlock}
              >
                Block
              </CustomButton>
            </Box>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              right: "-1%",
              top: "-1%",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <Cross />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default BlockBulkCustomerDrawer;
