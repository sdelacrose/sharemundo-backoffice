"use client";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import "../globals.scss";
import logo from "../assets/images/favIcon.png";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomToaster from "./common/CustomToaster";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en" style={{ overflowX: "hidden" }}>
        <head>
          <link rel="icon" href={logo.src} type="image/png" />
        </head>
        <body>
          <CustomToaster />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
