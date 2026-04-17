'use client';

import Header from '@/app/components/common/Header';
import { SidebarContext } from '@/app/(pages)/layout';
import { Alert, Box, Divider, Paper, Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import ReviewDecisionDialog from './components/ReviewDecisionDialog';
import PublicationRequestsTable from './components/PublicationRequestsTable';
import ReviewFilters from './components/ReviewFilters';
import { useBackofficeTranslation } from '@/app/utils/useBackofficeTranslation';
import { useAIChatReview } from './hooks/useAIChatReview';
import { getDecisionDialogContent } from './utils/review';

const AIChatReview = () => {
  const context = useContext(SidebarContext);
  const { t } = useBackofficeTranslation();
  const {
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
  } = useAIChatReview();

  const decisionDialogContent = useMemo(
    () => getDecisionDialogContent(t, decisionDialogAction, decisionDialogRequest),
    [decisionDialogAction, decisionDialogRequest, t],
  );

  const breadcrumbs = useMemo(
    () => [
      { title: t('aiChatReview.breadcrumbs.integrations') },
      { title: t('aiChatReview.breadcrumbs.review') },
    ],
    [t],
  );

  if (context === undefined) {
    return <div>{t('aiChatReview.noContext')}</div>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        marginLeft: context.isSidebarCollapsed ? '92px' : '280px',
        minHeight: '100vh',
        background: '#f7f8fb',
      }}
    >
      <Header breadcrumbItems={breadcrumbs} />
      <Box sx={{ p: 3 }}>
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {t('aiChatReview.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {t('aiChatReview.subtitle')}
              </Typography>
            </Box>

            <ReviewFilters
              statusFilter={statusFilter}
              loading={loading}
              onStatusChange={setStatusFilter}
              onRefresh={() => void loadRequests(statusFilter)}
              t={t}
            />
          </Box>
          <Divider />
          <Box sx={{ p: 3 }}>
            {!hasRequests ? (
              <Alert severity="info">{t('aiChatReview.empty')}</Alert>
            ) : (
              <PublicationRequestsTable
                requests={requests}
                t={t}
                onDecision={openDecisionDialog}
              />
            )}
          </Box>
        </Paper>
      </Box>

      <ReviewDecisionDialog
        open={Boolean(decisionDialogAction && decisionDialogRequest)}
        title={decisionDialogContent.title}
        description={decisionDialogContent.description}
        label={t('aiChatReview.dialog.label')}
        confirmLabel={decisionDialogContent.confirmLabel}
        cancelLabel={t('aiChatReview.buttons.cancel')}
        value={reviewNotes}
        onChange={setReviewNotes}
        onClose={closeDecisionDialog}
        onConfirm={submitDecision}
      />
    </Box>
  );
};

export default AIChatReview;
