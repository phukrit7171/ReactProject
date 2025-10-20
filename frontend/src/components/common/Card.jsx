import React from 'react';
import { Card as MuiCard, CardContent, CardActions, Typography, styled } from '@mui/material';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  margin: theme.spacing(2),
  minWidth: 275,
  boxShadow: theme.shadows[3],
}));

const Card = ({ title, children, actions, className }) => {
  return (
    <StyledCard className={className}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </StyledCard>
  );
};

export default Card;