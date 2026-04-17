'use client';

import { Button, MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';
import { PublicationStatus } from '../types';

interface ReviewFiltersProps {
  statusFilter: PublicationStatus | 'all';
  loading: boolean;
  onStatusChange: (value: PublicationStatus | 'all') => void;
  onRefresh: () => void;
  t: (key: string) => string;
}

const ReviewFilters = ({
  statusFilter,
  loading,
  onStatusChange,
  onRefresh,
  t,
}: ReviewFiltersProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={2}
    justifyContent="flex-end"
  >
    <TextField
      select
      label={t('aiChatReview.filters.status')}
      value={statusFilter}
      onChange={(event) =>
        onStatusChange(event.target.value as PublicationStatus | 'all')
      }
      sx={{ minWidth: 220 }}
    >
      <MenuItem value="all">{t('aiChatReview.filters.all')}</MenuItem>
      <MenuItem value="pending_review">
        {t('aiChatReview.filters.pendingReview')}
      </MenuItem>
      <MenuItem value="approved">{t('aiChatReview.filters.approved')}</MenuItem>
      <MenuItem value="rejected">{t('aiChatReview.filters.rejected')}</MenuItem>
      <MenuItem value="revoked">{t('aiChatReview.filters.revoked')}</MenuItem>
      <MenuItem value="draft">{t('aiChatReview.filters.draft')}</MenuItem>
    </TextField>
    <Button
      variant="outlined"
      onClick={onRefresh}
      disabled={loading}
      sx={{
        minWidth: 0,
        px: 1.5,
        py: 0.7,
        borderRadius: '8px',
        borderColor: '#d4dbe7',
        backgroundColor: '#ffffff',
        color: '#233146',
        fontWeight: 700,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        alignSelf: { xs: 'flex-start', md: 'center' },
        '&:hover': {
          borderColor: '#b8c4d6',
          backgroundColor: '#f8fafc',
        },
      }}
    >
      {t('aiChatReview.buttons.refresh')}
    </Button>
  </Stack>
);

export default ReviewFilters;
