import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { AccordionIcon } from '@/app/assets/icons';
import { GenericAccordionProps } from '@/app/types/AccordionProps';

const CustomAccordion: React.FC<GenericAccordionProps> = ({
  title,
  children,
  withRadio = false,
  onRadioChange,
  expanded,
  onToggleExpand,
  actions,
  icon = <AccordionIcon />,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggleExpand}
      sx={{
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<IconButton>{icon}</IconButton>}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        sx={{
          padding: '0 16px',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {withRadio && (
          <Radio
            onChange={onRadioChange}
            inputProps={{ 'aria-label': title }}
            sx={{ marginRight: '8px' }}
          />
        )}
        <Typography variant="body1" sx={{ fontSize: '16px' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
      {actions && <AccordionActions>{actions}</AccordionActions>}
    </Accordion>
  );
};

export default CustomAccordion;
