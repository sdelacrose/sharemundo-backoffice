"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import CustomTextField from "@/app/components/common/CustomTextfield";
import CustomSelect from "@/app/components/common/CustomSelect";
import {
  FEEDBACK_STATUS_OPTIONS,
  FEEDBACK_TYPES_OPTIONS,
} from "@/app/constants";
import CustomButton from "@/app/components/common/CustomButton";
import Image from "next/image";
import DownloadIcon from "@mui/icons-material/Download";

interface FeedbackFormProps {
  data: any;
  onSave: (payload: any) => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  data,
  onSave,
  onCancel,
}) => {
  const isClosed = data?.status === "closed";

  const { control, handleSubmit } = useForm({
    defaultValues: {
      company: data.company_profile?.name || "",
      solution_name: data.solution_name || "",
      user: data.user?.name || "",
      project: data.project?.name || "",
      role: data.project_team_role || "",
      feedback_type: data.feedback_type || "",
      description: data.description || "",
      status: data.status || "",
    },
  });

  const submitForm = (formValues: any) => {
    const wasStatusUpdated = formValues.status !== data.status;

    if (wasStatusUpdated) {
      onSave({ id: data.id, status: formValues.status });
    }
  };

  const handleFileDownload = (url: string, fileName?: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || url.split("/").pop() || "file";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} label="Company" fullWidth disabled />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="solution_name"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Solution Name"
                fullWidth
                disabled
              />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} label="User" fullWidth disabled />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="project"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} label="Project" fullWidth disabled />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} label="Role" fullWidth disabled />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="feedback_type"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Type"
                value={field.value}
                onChange={(e: SelectChangeEvent) =>
                  field.onChange(e.target.value)
                }
                options={FEEDBACK_TYPES_OPTIONS}
                placeholder="Select Type"
                disabled
              />
            )}
          />
        </Box>

        {/* Status */}
        <Box sx={{ flex: "1 1 48%" }}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Status"
                value={field.value}
                onChange={(e: SelectChangeEvent) =>
                  field.onChange(e.target.value)
                }
                options={FEEDBACK_STATUS_OPTIONS.filter(
                  (option) => option.value !== ""
                )}
                placeholder="Select Status"
                disabled={isClosed}
              />
            )}
          />
        </Box>

        {/* Description */}
        <Box sx={{ flex: "1 1 100%" }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                disabled
              />
            )}
          />
        </Box>

        <Box sx={{ flex: "1 1 100%", mt: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Attachments
          </Typography>

          {data.attachments && data.attachments.length > 0 ? (
            <Box display="flex" flexWrap="wrap" gap={2}>
              {data.attachments.map((url: string, index: number) => {
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
                const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
                const fileName = decodeURIComponent(
                  url.split("/").pop() || `file-${index}`
                );

                return (
                  <Box
                    key={index}
                    sx={{
                      width: 150,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid #E4E7EC",
                      backgroundColor: "#FAFAFA",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{ width: "100%", height: 100, position: "relative" }}
                    >
                      {isImage ? (
                        <Image
                          src={url}
                          alt={`attachment-${index}`}
                          fill
                          style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                      ) : isVideo ? (
                        <video
                          controls
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        >
                          <source src={url} />
                          Your browser does not support video playback.
                        </video>
                      ) : (
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ maxWidth: "100%" }}
                        >
                          {fileName}
                        </Typography>
                      )}
                    </Box>

                    {/* ⬇️ Download action */}
                    <Box
                      mt={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        gap: 0.5,
                        cursor: "pointer",
                        color: "#004FA7",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleFileDownload(url, fileName)}
                    >
                      <DownloadIcon fontSize="small" />
                      <Typography variant="caption" sx={{ fontSize: "12px" }}>
                        Download
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No attachments available.
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: "1 1 100%", mt: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Responses
          </Typography>

          {data.responses && data.responses.length > 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ backgroundColor: "#F9FAFB", p: 2, borderRadius: 2 }}
            >
              {data.responses.map((res: any) => (
                <Box
                  key={res.id}
                  sx={{
                    p: 2,
                    border: "1px solid #E4E7EC",
                    borderRadius: 1,
                    backgroundColor: "white",
                  }}
                >
                  <Typography variant="body2" fontWeight={600} mb={0.5}>
                    {res.responded_by?.name ?? "Unknown User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {res.response}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#9E9E9E", mt: 1, display: "block" }}
                  >
                    {new Date(res.created_at).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No responses yet.
            </Typography>
          )}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            flex: "1 1 100%",
            mt: 4,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "#E4E7EC",
              color: "black",
              "&:hover": { backgroundColor: "#E4E7EC" },
            }}
            onClick={onCancel}
          >
            Cancel
          </CustomButton>

          {!isClosed && (
            <CustomButton
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#004FA7",
                color: "white",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Save
            </CustomButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackForm;
