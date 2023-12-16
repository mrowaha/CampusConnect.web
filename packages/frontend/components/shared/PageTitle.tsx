import React from 'react' ;
import { 
    Typography 
} from '@mui/material';

export const PageTitle = ({  pageTitle }) => {
    return  (
      <>
        {/* horizontal margin */}
    <div 
    style={{
      width: "100%",
      height : 50
    }}
  />
        <Typography variant="h4" color="primary" 
          sx={{
            width: 'fit-content',
            margin: "0 auto",
            fontSize: '2.5rem',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '1.375rem',
            paddingTop: 2,
            paddingBottom: 5,
            textAlign: 'center',
            textTransform : "uppercase",
            letterSpacing: 5,
          }}
        >
        { pageTitle}
        </Typography>
        {/* horizontal margin */}
    <div 
          style={{
            width: "100%",
            height : 50
          }}
        />
        </>
    );
};