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
      className={className}
      fullWidth={fullWidth}
      onClick={callback}
      disabled={disabled}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default ButtonDelStaShut;
