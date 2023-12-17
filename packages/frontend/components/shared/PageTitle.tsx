import React from 'react';
import { Typography } from '@mui/material';

export const PageTitle = ({ pageTitle, disableUppercase }) => {
  return (
    <Typography variant="h4" color="primary" 
      sx={{
        width: 'fit-content',
        margin: "0 auto",
        fontSize: '2.5rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '1.375rem',
        paddingTop: 4,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: '"Roboto", sans-serif', // or "Montserrat"
        textTransform: disableUppercase ? 'none' : 'uppercase',
        letterSpacing: 1, // or you can try specific values like -1 or -0.5
      }}
    >
      {pageTitle}
    </Typography>
  );
};
