import { DynamicBadgeProps } from '@/app/types/BadgeProps';
import { Badge, Stack } from '@mui/material';

const CustomBadge: React.FC<DynamicBadgeProps> = ({
  icon,
  badgeContent,
  color = 'primary',
  showZero = true,
  heading,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Badge color={color} badgeContent={badgeContent} showZero={showZero}>
        {icon}
      </Badge>

      {heading && <span>{heading}</span>}
    </Stack>
  );
};

export default CustomBadge;
