"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { Box, Grid, Typography, Button, Divider, Stack } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { SidebarContext } from "@/app/(pages)/layout";
import { apiCall } from "@/app/utils/APIUtils";
import Header from "@/app/components/common/Header";
import Loader from "@/app/components/common/Loader";

import { promoCodeBreadcrumb } from "../Dashboard/data";
import AgGridTable from "@/app/ag-grid";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import dayjs from "dayjs";
import { getCouponColumns } from "./couponColumnDefs";
import { Coupon } from "@/app/types/CouponProps";
import { PromoCode } from "@/app/types/PromoCodeProps";
import { getPromoCodeColumns } from "./promoCodeColumnDefs";
import CouponDrawer from "./CouponDrawer";
import NewPromoCodeDrawer from "./NewPromoCodeDrawer";
import toast from "react-hot-toast";

const CouponManagement = () => {
  const context = useContext(SidebarContext);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const [promoCodeDrawerOpen, setPromoCodeDrawerOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({});
  const [promoFormData, setPromoFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const selectedPromoCodes: any =
    selectedCoupon &&
    coupons.find((coupon) => coupon.id === selectedCoupon?.id)?.promo_codes;

  const fetchCoupons = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      const url = `/package-license/coupon/?page=${page}`;
      const data = await apiCall(url, "GET");
      setCoupons(data?.results || []);
      setHasNextPage(!!data?.next);
      setHasPreviousPage(!!data?.previous);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNextPage = useCallback(() => {
    if (!loading && hasNextPage && currentPage < totalPages) {
      fetchCoupons(currentPage + 1);
    }
  }, [loading, hasNextPage, currentPage, totalPages, fetchCoupons]);

  const handlePreviousPage = useCallback(() => {
    if (!loading && hasPreviousPage && currentPage > 1) {
      fetchCoupons(currentPage - 1);
    }
  }, [loading, hasPreviousPage, currentPage, fetchCoupons]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCouponSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const method = formData.id ? "PUT" : "POST";
      const url = formData.id
        ? `/package-license/coupon/${formData.id}/`
        : "/package-license/coupon/";

      const payload = formData.id
        ? { name: formData.name }
        : {
            ...formData,
            percent_off:
              formData.discount_type === "percentage"
                ? Number(formData.percent_off)
                : null,
            amount_off:
              formData.discount_type === "fixed"
                ? Number(formData.amount_off)
                : null,
            duration_in_months:
              formData.duration === "repeating"
                ? Number(formData.duration_in_months)
                : null,
          };

      await apiCall(url, method, payload);
      toast.success(
        formData.id
          ? "Coupon name updated successfully"
          : "Coupon created successfully",
      );
      fetchCoupons(1);
      setCouponDrawerOpen(false);
    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  };

  const handleManageCode = (data: Coupon) => setSelectedCoupon(data);
  const handleEditCoupon = (data: Coupon) => {
    setFormData(data);
    setCouponDrawerOpen(true);
  };
  const handleDeleteCoupon = async (couponId: number) => {
    try {
      await apiCall(`/package-license/coupon/${couponId}/`, "DELETE");
      setSelectedCoupon(null);
      fetchCoupons(1);
      toast.success("Coupon deleted successfully");
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const handlePromoCodeSubmit = async () => {
    try {
      const payload = {
        ...promoFormData,
        coupon: selectedCoupon?.id,
        expires_at: promoFormData.expires_at
          ? new Date(promoFormData.expires_at).toISOString()
          : null,
        minimum_amount: promoFormData.minimum_amount
          ? Number(promoFormData.minimum_amount)
          : null,
      };

      await apiCall("/package-license/promo-code/", "POST", payload);
      if (selectedCoupon) {
        fetchCoupons(currentPage);
      }
      setPromoCodeDrawerOpen(false);
      toast.success("Promo code created successfully");
    } catch (error) {
      console.error("Error saving promo code:", error);
    }
  };

  const handleViewPromoCode = (data: PromoCode) => {
    setPromoFormData({
      ...data,
      expires_at: dayjs(data.expires_at),
    });
    setPromoCodeDrawerOpen(true);
  };
  const handleChangePromoCodeStatus = async (
    promoCodeId: number,
    status: boolean,
  ) => {
    try {
      await apiCall(`/package-license/promo-code/${promoCodeId}/`, "PATCH", {
        is_active: !status,
      });
      fetchCoupons(currentPage);
      toast.success(`Promo code is ${status ? "inactivated" : "activated"}`);
    } catch (error) {
      console.error("Error editing promo code:", error);
    }
  };

  const couponColumns = getCouponColumns({
    onManageCode: handleManageCode,
    onEditCoupon: handleEditCoupon,
    onDeleteCoupon: handleDeleteCoupon,
  });

  const promoCodeColumns = getPromoCodeColumns({
    onViewPromoCode: handleViewPromoCode,
    onChangePromoCodeStatus: handleChangePromoCodeStatus,
  });

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        marginLeft: context.isSidebarCollapsed ? "92px" : "280px",
        minHeight: "100vh",
        paddingLeft: "12px",
        transition: "all 0.3s ease",
      }}
    >
      <Box sx={{ ml: "-24px" }}>
        <Header breadcrumbItems={promoCodeBreadcrumb} />
      </Box>

      <Box sx={{ margin: "24px 24px 24px 0px" }}>
        <Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h2" paddingBottom={"8px"}>
                  Coupon Management
                </Typography>
                <Typography variant="body2" color="#475367" mt={1.5}>
                  sharemundo Back Office
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  setFormData({
                    discount_type: "percentage",
                    duration: "forever",
                    currency: "USD",
                  });
                  setCouponDrawerOpen(true);
                }}
                sx={{
                  height: 40,
                  px: 3,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                + New Coupon
              </Button>
            </Box>

            <Divider
              sx={{
                borderColor: "rgba(240, 242, 245, 1)",
                marginTop: "24px",
                marginBottom: "24px",
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={selectedCoupon ? 7 : 12}>
            <Box
              sx={{
                borderRadius: "10px",
                border: "1px solid #E4E7EC",
                bgcolor: "#FFF",
                boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
                overflow: "hidden",
              }}
            >
              <AgGridServerSideTable
                rowData={coupons}
                columnDefs={couponColumns}
                height={640}
                currentPage={currentPage}
                totalPages={totalPages}
                nextPageUrl={hasNextPage ? "next" : null}
                previousPageUrl={hasPreviousPage ? "previous" : null}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                loading={loading}
              />
            </Box>
          </Grid>

          {selectedCoupon && (
            <Grid item xs={5}>
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #E4E7EC",
                  bgcolor: "#FFF",
                  boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={2}
                >
                  <Typography fontWeight={600}>
                    {selectedCoupon.name} Codes
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setPromoFormData({
                        is_active: true,
                        currency: "USD",
                        expires_at: dayjs().add(1, "hour"),
                      });
                      setPromoCodeDrawerOpen(true);
                    }}
                    sx={{
                      height: 40,
                      px: 3,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    + New Promo Code
                  </Button>
                </Stack>

                <AgGridTable
                  rowData={selectedPromoCodes}
                  columnDefs={promoCodeColumns}
                  paginationPageSize={10}
                  height={565}
                />
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Coupon Form Drawer */}
        <CouponDrawer
          open={couponDrawerOpen}
          onClose={() => setCouponDrawerOpen(false)}
          formData={formData}
          setFormData={setFormData}
          onCouponSubmit={handleCouponSubmit}
        />

        {/* Promo Code Form Drawer */}
        <NewPromoCodeDrawer
          open={promoCodeDrawerOpen}
          onClose={() => setPromoCodeDrawerOpen(false)}
          formData={promoFormData}
          setFormData={setPromoFormData}
          onPromoCodeSubmit={handlePromoCodeSubmit}
        />
      </Box>
    </Box>
  );
};

export default CouponManagement;
