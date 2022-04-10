import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { ISize } from '@interfaces';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSizeChange: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSizeChange(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
