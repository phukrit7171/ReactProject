import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';

const Avatar = ({ src, alt, size = 'medium', ...props }) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ 
        width: size === 'small' ? 32 : size === 'medium' ? 40 : 56,
        height: size === 'small' ? 32 : size === 'medium' ? 40 : 56,
      }}
      {...props}
    >
      {!src && (alt?.charAt(0)?.toUpperCase() || '?')}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Avatar;