"use client";

import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";

interface FeedbackData {
  id: number;
  status: string;
  feedback_type: string;
  [key: string]: any;
}

interface MoreMenuProps {
  data: FeedbackData;
  onView?: (data: FeedbackData) => void;
  onEdit?: (data: FeedbackData) => void;
  onMoveToIncident?: (data: FeedbackData) => void;
  onMoveToImprovement?: (data: FeedbackData) => void;
  onClose?: (data: FeedbackData) => void;
  onArchive?: (data: FeedbackData) => void;
  onReply?: (data: FeedbackData) => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({
  data,
  onView,
  onEdit,
  onMoveToIncident,
  onMoveToImprovement,
  onClose,
  onArchive,
  onReply,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const isClosed = data?.status === "closed";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleMenuOpen}
        aria-controls={isMenuOpen ? "feedback-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="feedback-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            width: "250px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {(onView || onEdit) && (
          <MenuItem
            onClick={() => {
              onView?.(data);
              if (!isClosed) {
                onEdit?.(data);
              }
              handleMenuClose();
            }}
          >
            <VisibilityIcon
              sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
            />
            {isClosed ? "View" : "View / Edit"}
          </MenuItem>
        )}

        {!isClosed &&
          data.status !== "incident_created" &&
          onMoveToIncident && (
            <MenuItem
              onClick={() => {
                onMoveToIncident(data);
                handleMenuClose();
              }}
            >
              <SwapHorizIcon
                sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
              />
              Move to Incident
            </MenuItem>
          )}

        {!isClosed &&
          data.status !== "improvement_created" &&
          onMoveToImprovement && (
            <MenuItem
              onClick={() => {
                onMoveToImprovement(data);
                handleMenuClose();
              }}
            >
              <SwapHorizIcon
                sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
              />
              Move to Improvement
            </MenuItem>
          )}

        {!isClosed && data.status !== "closed" && onClose && (
          <MenuItem
            onClick={() => {
              onClose(data);
              handleMenuClose();
            }}
          >
            <CloseIcon
              sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
            />
            Close
          </MenuItem>
        )}

        {!isClosed && data.status !== "archived" && onArchive && (
          <MenuItem
            onClick={() => {
              onArchive(data);
              handleMenuClose();
            }}
          >
            <ArchiveIcon
              sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
            />
            Archive
          </MenuItem>
        )}

        {/* {onReply && data.answer_required && ( */}
        {onReply && (
          <MenuItem
            onClick={() => {
              onReply(data);
              handleMenuClose();
            }}
          >
            <ReplyIcon
              sx={{ fontSize: 18, color: "#6c757d", marginRight: "10px" }}
            />
            Reply
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MoreMenu;
