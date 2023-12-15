import React from 'react'; 
import { useRouter } from 'next/router';

import {
    Button,
    Chip, Paper, useTheme,
} from '@mui/material' ;

export const TrendingChip = ({ tagChip }) => {
    const router = useRouter();
    const theme = useTheme();
    const [isSelected, setIsSelected] = React.useState(tagChip.isSelected);
    
    const handleIsSelected = (event : any) => {
        setIsSelected(!isSelected);
        
      };
    
return (
    <Paper>
    <Button variant="outlined" onClick={handleIsSelected} style={{
          backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
          color: isSelected ? '#ffffff' : theme.palette.primary.main,
        }}>
     {tagChip.name}
    </Button>
    </Paper>
);
};