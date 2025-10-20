import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Input = ({ 
  label,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  placeholder,
  required,
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      error={!!error}
      helperText={error || helperText}
      fullWidth={fullWidth}
      variant="outlined"
      {...props}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Input;