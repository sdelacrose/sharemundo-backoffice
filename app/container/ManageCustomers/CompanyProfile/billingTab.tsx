"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { BillingColumnDefs } from "@/app/const/GridTable/ColDef";
import useColumnBillingCompany from "@/app/hooks/Grid-Table/useColumnBillingCompany";
import { apiCall } from "@/app/utils/APIUtils";
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter";

const BillingTab = ({ id }: { id: string }) => {
  const BillingCol = useColumnBillingCompany(BillingColumnDefs);

  const [rowData, setRowData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getTrimmedUrl = (url: string) => {
    return url.includes("/admin-dashboard")
      ? url.substring(url.indexOf("/admin-dashboard"))
      : url;
  };

  const fetchBillingData = async (url: string) => {
    try {
      const trimmedUrl = getTrimmedUrl(url);
      const billingData = await apiCall(trimmedUrl);

      const formattedData = billingData.results.invoices.map(
        (invoice: any) => ({
          id: invoice.invoice_no,
          invoice_date: new Date(invoice.invoice_date).toLocaleDateString(),
          total_amount: `€${invoice.amount_due}`,
          total_licenses: invoice.line_items?.data?.length || 0,
          payment_method: invoice.payment_method,
          invoice: (
            <Box
              sx={{
                color: "#0057B7",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                cursor: "pointer",
                marginTop: "20px",
              }}
              onClick={() => window.open(invoice.invoice_pdf, "_blank")}
            >
              Download Invoice
            </Box>
          ),
          status: capitalizeFirstLetter(invoice.status),
        })
      );

      setRowData(formattedData);
      setNextPageUrl(billingData.next || null);
      setPreviousPageUrl(billingData.previous || null);
      setTotalPages(Math.ceil(billingData.count / 10));
    } catch (error) {
      console.error("Failed to fetch billing data:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchBillingData(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchBillingData(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchBillingData(`/admin-dashboard/customers/${id}/billing`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #E4E7EC",
          backgroundColor: "#FFF",
          boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
          overflow: "hidden",
          marginTop: "24px",
          marginRight: "32px",
        }}
      >
        <Box m={2} display={"flex"} justifyContent={"end"}>
          <SelectDatePicker />
        </Box>
        <AgGridServerSideTable
          rowData={rowData}
          columnDefs={BillingCol}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </Box>
    </>
  );
};

export default BillingTab;
