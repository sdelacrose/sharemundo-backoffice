"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import Header from "@/app/components/common/Header";
import { FeedbackIconBlack } from "@/app/assets/icons";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { SidebarContext } from "@/app/(pages)/layout";
import { FEEDBACK_STATUS_OPTIONS } from "@/app/constants";
import { getAuthToken } from "@/app/utils/GetAuthToken";
import useColumnFeedbackTable from "@/app/hooks/Grid-Table/useColumnFeedbackTable";
import { FeedbackColumnDefs } from "@/app/const/GridTable/ColDef";
import toast from "react-hot-toast";
import ReplyModal from "@/app/components/Modals/ReplyModal";
import FeedbackDrawer from "@/app/components/Drawers/FeedbackDrawer";

export const feedbacksBreadcrumb = [
  { title: "Feedbacks", icon: FeedbackIconBlack },
];

const Feedbacks: React.FC = () => {
  const context = useContext(SidebarContext);
  const [selectedStatus, setSelectedStatus] = useState(""); // "" means All
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [previousPageUrl, setPreviousPageUrl] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pageSize = 10;

  const onView = (data: any) => {
    setSelectedFeedback(data);
    setIsDrawerOpen(true);
  };

  const onEdit = (data: any) => {
    setSelectedFeedback(data);
    setIsDrawerOpen(true);
  };
  const onReply = (data: any) => {
    setSelectedFeedback(data);
    setIsReplyModalOpen(true);
  };

  const giveReply = async (replyText: string) => {
    if (!selectedFeedback?.id) return;

    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `https://development.api.sharemundolinks.com/api/user/feedback/${selectedFeedback.id}/respond/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ admin_response: replyText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit reply");
      }
      getFeedbacks(selectedStatus, 1);
      setCurrentPage(1);
      toast.success("Reply submitted successfully");
    } catch (error) {
      toast.error("Failed to submit reply");
      console.error("Reply error:", error);
    }
  };

  const onMoveToIncident = async (data: any) => {
    console.log("Moving to incident:", data);
    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `https://development.api.sharemundolinks.com/api/user/feedback/${data.id}/update_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: "incident_created" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status to incident_created");
      }
      getFeedbacks(selectedStatus, 1);
      setCurrentPage(1);
      toast.success("Moved to incident");
    } catch (error) {
      toast.error("Error moving to incident");
      console.error("Error moving to incident:", error);
    }
  };

  const onMoveToImprovement = async (data: any) => {
    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `https://development.api.sharemundolinks.com/api/user/feedback/${data.id}/update_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: "improvement_created" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status to improvement_created");
      }
      getFeedbacks(selectedStatus, 1);
      setCurrentPage(1);
      toast.success("Moved to improvement");
    } catch (error) {
      toast.error("Error moving to improvement");
      console.error("Error moving to improvement:", error);
    }
  };

  const onClose = async (data: any) => {
    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `https://development.api.sharemundolinks.com/api/user/feedback/${data.id}/update_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: "closed" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status to closed");
      }
      getFeedbacks(selectedStatus, 1);
      setCurrentPage(1);
      toast.success("Feedback closed");
    } catch (error) {
      toast.error("Error closing feedback");
      console.error("Error moving to closing:", error);
    }
  };

  const onArchive = async (data: any) => {
    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `https://development.api.sharemundolinks.com/api/user/feedback/${data.id}/update_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: "archived" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status to archived");
      }
      getFeedbacks(selectedStatus, 1);
      setCurrentPage(1);
      toast.success("Feedback archived");
    } catch (error) {
      toast.error("Error archiving feedback:");
      console.error("Error moving to archive:", error);
    }
  };

  const feedbackCols = useColumnFeedbackTable(
    FeedbackColumnDefs,
    onView,
    onEdit,
    onMoveToIncident,
    onMoveToImprovement,
    onClose,
    onArchive,
    onReply
  );

  const getFeedbacks = async (status = "", page = 1, token?: string) => {
    setLoading(true);

    try {
      let authToken = await getAuthToken();
      if (token) {
        authToken = token;
      }

      const url = new URL(
        "https://development.api.sharemundolinks.com/api/user/feedback/"
      );
      url.searchParams.append("page", page.toString());
      url.searchParams.append("page_size", pageSize.toString());
      if (status) {
        url.searchParams.append("status", status);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }

      const res = await response.json();

      if (res && res.results) {
        setFeedbackData(res.results);
        setTotalPages(Math.ceil(res.count / pageSize));
        setNextPageUrl(res.next || "");
        setPreviousPageUrl(res.previous || "");
      }
    } catch (error) {
      toast.error("Error fetching feedbacks");
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeedbacks(selectedStatus, 1);
    setCurrentPage(1);
  }, [selectedStatus]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      const nextPage = currentPage + 1;
      getFeedbacks(selectedStatus, nextPage);
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      const prevPage = currentPage - 1;
      getFeedbacks(selectedStatus, prevPage);
      setCurrentPage(prevPage);
    }
  };

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          marginLeft: context.isSidebarCollapsed ? "92px" : "280px",
          minHeight: "100vh",
          paddingLeft: "12px",
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ marginLeft: "-24px" }}>
          <Header breadcrumbItems={feedbacksBreadcrumb} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F9FAFB",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Feedbacks
          </Typography>
        </Box>

        <Tabs
          value={selectedStatus}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ marginBottom: "16px" }}
        >
          {FEEDBACK_STATUS_OPTIONS.map((status) => (
            <Tab key={status.value} label={status.label} value={status.value} />
          ))}
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid #E4E7EC",
              backgroundColor: "#FFF",
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
              marginTop: "24px",
              marginRight: "32px",
              marginBottom: "48px",
            }}
          >
            <AgGridServerSideTable
              rowData={feedbackData}
              columnDefs={feedbackCols}
              height={500}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              loading={loading}
            />
          </Box>
        )}
      </Box>
      {isReplyModalOpen && (
        <ReplyModal
          open={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          onSave={giveReply}
        />
      )}
      {isDrawerOpen && selectedFeedback && (
        <FeedbackDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          data={selectedFeedback}
          onSave={() => {
            setIsDrawerOpen(false);
            getFeedbacks(selectedStatus, 1);
            setCurrentPage(1);
          }}
        />
      )}
    </>
  );
};

export default Feedbacks;
