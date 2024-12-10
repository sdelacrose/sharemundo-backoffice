// import React from "react";
// import { Box, Divider } from "@mui/material";
// import CustomBreadcrumbs from "@/app/components/common/CustomBreadcrumb";
// import { HeaderProps } from "@/app/types/DashboardProps";
// import CustomBadge from "@/app/components/common/CustomBadge";
// import header from "../../../assets/icons/Header.svg";
// import Tooltip from "@mui/material/Tooltip";
// import Image from "next/image";
// import styles from "./index.module.scss";
// import { DropdownIcon } from "@/app/assets/icons";
// const Header: React.FC<HeaderProps> = ({ breadcrumbItems }) => {
//   return (
//     <>
//       <Box
//         sx={{
//           padding: "15px 18px 15px 18px",
//           background: "#fff",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           height: "53px",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <CustomBreadcrumbs items={breadcrumbItems} />
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
//           {/* <CustomBadge
//             icon={<BellIcon />}
//             badgeContent={2}
//             color="error"
//             showZero={false}
//           />{" "} */}
//           <Tooltip title="Logout" arrow>
//             <div
//               style={{
//                 marginLeft: "32px",
//                 cursor: "pointer",
//               }}
//             >
//               {/* <Logout /> */}
//             </div>
//           </Tooltip>
//           {/* <Image src={header} alt="header" className={styles.image} />
//           <DropdownIcon /> */}
//         </Box>
//       </Box>
//       <Divider />
//     </>
//   );
// };

// export default Header;
