'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiCall } from '@/app/utils/APIUtils';
import { PublicationRequest, PublicationStatus, ReviewAction } from '../types';

export const useAIChatReview = () => {
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | 'all'>(
    'pending_review',
  );
  const [requests, setRequests] = useState<PublicationRequest[]>([]);
  const [decisionDialogAction, setDecisionDialogAction] =
    useState<ReviewAction | null>(null);
  const [decisionDialogRequest, setDecisionDialogRequest] =
    useState<PublicationRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const loadRequests = useCallback(
    async (nextStatus: PublicationStatus | 'all' = statusFilter) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (nextStatus !== 'all') {
          params.set('status', nextStatus);
        }

        const query = params.toString() ? `?${params.toString()}` : '';
        const response = await apiCall(`/ai-chat/mcp-publication-requests/${query}`);
        setRequests(Array.isArray(response) ? response : response.results ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [statusFilter],
  );

  useEffect(() => {
    void loadRequests(statusFilter);
  }, [loadRequests, statusFilter]);

  const openDecisionDialog = useCallback(
    (publicationRequest: PublicationRequest, action: ReviewAction) => {
      setDecisionDialogRequest(publicationRequest);
      setDecisionDialogAction(action);
      setReviewNotes('');
    },
    [],
  );

  const closeDecisionDialog = useCallback(() => {
    setDecisionDialogAction(null);
    setDecisionDialogRequest(null);
    setReviewNotes('');
  }, []);

  const submitDecision = useCallback(async () => {
    if (!decisionDialogAction || !decisionDialogRequest) {
      return;
    }

    try {
      await apiCall(
        `/ai-chat/mcp-publication-requests/${decisionDialogRequest.id}/${decisionDialogAction}/`,
        'POST',
        { review_notes: reviewNotes },
      );
      closeDecisionDialog();
      await loadRequests(statusFilter);
    } catch (error) {
      console.error(error);
    }
  }, [
    closeDecisionDialog,
    decisionDialogAction,
    decisionDialogRequest,
    loadRequests,
    reviewNotes,
    statusFilter,
  ]);

  const hasRequests = useMemo(() => requests.length > 0, [requests]);

  return {
    loading,
    statusFilter,
    requests,
    reviewNotes,
    decisionDialogAction,
    decisionDialogRequest,
    hasRequests,
    setStatusFilter,
    setReviewNotes,
    loadRequests,
    openDecisionDialog,
    closeDecisionDialog,
    submitDecision,
  };
};
