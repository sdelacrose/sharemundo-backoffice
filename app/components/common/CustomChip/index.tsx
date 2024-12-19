import { CustomChipProps } from '@/app/types/ChipProps';
import { Chip } from '@mui/material';

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  onClick,
  onDelete,
  variant = 'filled',
  color = 'default',
}) => {
  return (
    <Chip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      variant={variant}
      color={color}
    />
  );
};

export default CustomChip;
