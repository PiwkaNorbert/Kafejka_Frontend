import React from 'react';
import { Button } from '@mui/material';

const ButtonDelStaShut = ({
  color,
  className,
  disabled,
  icon,
  text,
  fullWidth,
  callback,
  variant,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size="small"
      type="submit"
      disabled={disabled}
      className={className}
      fullWidth={fullWidth}
      onClick={callback}
    >
      {icon}
      {text}
    </Button>
  );
};

export default ButtonDelStaShut;
