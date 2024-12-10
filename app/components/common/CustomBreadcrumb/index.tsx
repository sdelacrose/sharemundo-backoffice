import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

interface BreadcrumbItem {
  title: string;
  href?: string;
  icon?: React.ElementType;
  color?: string;
}

interface CustomBreadcrumbsProps {
  items: BreadcrumbItem[];
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({
  items,
  onClick,
}) => {
  return (
    <Box role="presentation" onClick={onClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          if (item.href) {
            return (
              <Link
                key={index}
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
                color="#0057B7"
                href={item.href}
              >
                {IconComponent && (
                  <IconComponent
                    sx={{ mr: 0.5, marginBottom: '2px' }}
                    fontSize="inherit"
                  />
                )}
                {item.title}
              </Link>
            );
          } else {
            return (
              <Typography
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#202332',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {IconComponent && (
                  <IconComponent
                    style={{ mr: 0.5, marginBottom: '4px' }}
                    fontSize="inherit"
                  />
                )}

                {item.title}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;
