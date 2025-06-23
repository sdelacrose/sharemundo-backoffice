export enum FeedbackStatus {
  All = "",
  Open = "open",
  IncidentCreated = "incident_created",
  ImprovementCreated = "improvement_created",
  NoAction = "no_action",
  Closed = "closed",
  Archived = "archived",
}

export enum FeedbackType {
  Bug = "bug",
  Incident = "incident",
  Improvement = "improvement",
  Suggestion = "suggestion",
}

export const FEEDBACK_STATUS_OPTIONS = [
  { value: FeedbackStatus.All, label: "All" },
  { value: FeedbackStatus.Open, label: "Open" },
  { value: FeedbackStatus.IncidentCreated, label: "Incident Created" },
  { value: FeedbackStatus.ImprovementCreated, label: "Improvement Created" },
  { value: FeedbackStatus.NoAction, label: "No Action Requested" },
  { value: FeedbackStatus.Closed, label: "Closed" },
  { value: FeedbackStatus.Archived, label: "Archived" },
];

export const FEEDBACK_TYPES_OPTIONS = [
  { value: FeedbackType.Bug, label: "Bug" },
  { value: FeedbackType.Incident, label: "Incident" },
  { value: FeedbackType.Improvement, label: "Improvement" },
  { value: FeedbackType.Suggestion, label: "Suggestion" },
];
