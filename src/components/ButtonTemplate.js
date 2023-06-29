import React from 'react';
import { Button } from '@mui/material';

const ButtonTemplate = ({
  color,
  className,
  disabled,
  icon,
  text,
  fullWidth,
  callback,
  variant,
  value,
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
      value={value}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default ButtonTemplate;
