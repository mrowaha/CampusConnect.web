import React from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  pageTitle: string;
  disableUppercase? : boolean;
}

export const PageTitle = ({ pageTitle, disableUppercase } : PageTitleProps) => {
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
        letterSpacing: 1, 
      }}
    >
      {pageTitle}
    </Typography>
  );
};
