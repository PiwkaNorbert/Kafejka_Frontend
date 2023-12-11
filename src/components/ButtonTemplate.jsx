import { Button } from '@mui/material';
import PropTypes from 'prop-types';

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

ButtonTemplate.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  text: PropTypes.string,
  fullWidth: PropTypes.bool,
  callback: PropTypes.func,
  variant: PropTypes.string,
  value: PropTypes.string,
};

export default ButtonTemplate;
