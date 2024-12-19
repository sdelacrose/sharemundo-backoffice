"use client";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en" style={{ overflowX: "hidden" }}>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
