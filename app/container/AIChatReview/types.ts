'use client';

export type PublicationStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'revoked';

export type ReviewAction = 'approve' | 'reject' | 'revoke';

export interface PublicationRequest {
  id: number;
  status: PublicationStatus;
  requested_visibility: 'private' | 'public';
  submission_notes: string;
  review_notes: string;
  submitting_company_name: string;
  reviewed_by_name: string | null;
  submitted_at: string | null;
  definition: {
    id: number;
    name: string;
    endpoint_url: string;
    tool_namespace: string;
    health: {
      is_healthy: boolean;
      status: string;
      error_message: string;
    } | null;
  };
}
