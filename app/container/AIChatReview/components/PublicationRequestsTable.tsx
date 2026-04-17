'use client';

import {
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { PublicationRequest, ReviewAction } from '../types';
import { statusColor } from '../utils/review';

interface PublicationRequestsTableProps {
  requests: PublicationRequest[];
  t: (key: string) => string;
  onDecision: (request: PublicationRequest, action: ReviewAction) => void;
}

const PublicationRequestsTable = ({
  requests,
  t,
  onDecision,
}: PublicationRequestsTableProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('aiChatReview.table.mcp')}</TableCell>
        <TableCell>{t('aiChatReview.table.company')}</TableCell>
        <TableCell>{t('aiChatReview.table.status')}</TableCell>
        <TableCell align="right">{t('aiChatReview.table.actions')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {requests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 600 }}>
                {request.definition.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.definition.endpoint_url}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {request.definition.tool_namespace}
              </Typography>
              {request.submission_notes ? (
                <Typography variant="caption" color="text.secondary">
                  {request.submission_notes}
                </Typography>
              ) : null}
              {request.review_notes ? (
                <Typography variant="caption" color="text.secondary">
                  {request.review_notes}
                </Typography>
              ) : null}
            </Stack>
          </TableCell>
          <TableCell>{request.submitting_company_name}</TableCell>
          <TableCell>
            <Chip
              size="small"
              label={t(`aiChatReview.statuses.${request.status}`)}
              color={statusColor(request.status)}
            />
          </TableCell>
          <TableCell align="right">
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              flexWrap="wrap"
              useFlexGap
            >
              {request.status === 'pending_review' ? (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => onDecision(request, 'approve')}
                  sx={{
                    minWidth: 0,
                    px: 1.75,
                    py: 0.7,
                    borderRadius: '8px',
                    background:
                      'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.22)',
                    color: '#ffffff',
                    fontWeight: 700,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                      boxShadow: '0 12px 28px rgba(29, 78, 216, 0.28)',
                    },
                  }}
                >
                  {t('aiChatReview.buttons.approve')}
                </Button>
              ) : null}
              {request.status === 'pending_review' ? (
                <Button
                  size="small"
                  onClick={() => onDecision(request, 'reject')}
                  sx={{
                    minWidth: 0,
                    px: 1.5,
                    py: 0.7,
                    borderRadius: '8px',
                    border: '1px solid #f3d3a1',
                    backgroundColor: '#fff8eb',
                    color: '#9a5b00',
                    fontWeight: 700,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#ffefcc',
                      borderColor: '#edbf72',
                    },
                  }}
                >
                  {t('aiChatReview.buttons.reject')}
                </Button>
              ) : null}
              {request.status === 'approved' ? (
                <Button
                  size="small"
                  onClick={() => onDecision(request, 'revoke')}
                  sx={{
                    minWidth: 0,
                    px: 1.5,
                    py: 0.7,
                    borderRadius: '8px',
                    border: '1px solid #f5c2c7',
                    backgroundColor: '#fff1f2',
                    color: '#be123c',
                    fontWeight: 700,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#ffe4e6',
                      borderColor: '#f39aa8',
                    },
                  }}
                >
                  {t('aiChatReview.buttons.revoke')}
                </Button>
              ) : null}
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PublicationRequestsTable;
