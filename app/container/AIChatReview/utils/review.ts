'use client';

import { PublicationStatus, ReviewAction, PublicationRequest } from '../types';

export const statusColor = (status: PublicationStatus) => {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'pending_review') {
    return 'warning';
  }

  if (status === 'rejected' || status === 'revoked') {
    return 'error';
  }

  return 'default';
};

export const getDecisionDialogContent = (
  t: (key: string, values?: Record<string, string>) => string,
  action: ReviewAction | null,
  request: PublicationRequest | null,
) => {
  if (!action || !request) {
    return {
      title: '',
      description: '',
      confirmLabel: '',
    };
  }

  const values = { name: request.definition.name };

  if (action === 'approve') {
    return {
      title: t('aiChatReview.dialog.approveTitle'),
      description: t('aiChatReview.dialog.approveDescription', values),
      confirmLabel: t('aiChatReview.buttons.approve'),
    };
  }

  if (action === 'reject') {
    return {
      title: t('aiChatReview.dialog.rejectTitle'),
      description: t('aiChatReview.dialog.rejectDescription', values),
      confirmLabel: t('aiChatReview.buttons.reject'),
    };
  }

  return {
    title: t('aiChatReview.dialog.revokeTitle'),
    description: t('aiChatReview.dialog.revokeDescription', values),
    confirmLabel: t('aiChatReview.buttons.revoke'),
  };
};
