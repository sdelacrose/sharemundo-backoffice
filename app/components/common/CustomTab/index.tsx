import * as React from 'react';

import { CustomTabsProps } from '@/app/types/TabProps';
import { Tabs, Tab, Box } from '@mui/material';

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, onTabChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '750px',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="custom tabs"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#0057B7',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={React.isValidElement(tab.icon) ? tab.icon : undefined}
            iconPosition="start"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: '14px',
              fontWeight: 500,
              color: value === index ? '#0057B7' : 'inherit',
              '&.Mui-selected': {
                color: '#0057B7',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
