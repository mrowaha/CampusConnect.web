import React from 'react' ;
import { 
    Typography 
} from '@mui/material';

export const PageTitle = ({  pageTitle }) => {
    return  (
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
            textTransform : "uppercase",
            letterSpacing: 5,
          }}
        >
        { pageTitle}
        </Typography>
    );
};