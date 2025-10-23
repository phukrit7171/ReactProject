// Avatar component
// Displays user profile pictures or default avatars consistently throughout the application
import React from 'react';
// Import Material UI Avatar component
import Avatar from '@mui/material/Avatar';

// Avatar component for displaying user profile images
// Can display initials, images, or default icons
const UserAvatar = ({ src, alt, size = 40 }) => {
  return (
    <Avatar
        src={src}
        alt={alt}
        sx={{ width: size, height: size }}
    >
        {!src && alt ? alt.charAt(0).toUpperCase() : null}
    </Avatar>
  );
};

export default UserAvatar;