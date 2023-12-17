import React from 'react'; 
import { useRouter } from 'next/router';

import {
    Button,
    Chip, Paper, useTheme,
} from '@mui/material' ;

interface TrendingChipProps {
  tagChip: string;
  isSelected: boolean;
  index: number;
  onSelect: (index : number) => void;
}

export const TrendingChip = (props: TrendingChipProps) => {
    const theme = useTheme();
    
    const handleIsSelected = (event : any) => {
      props.onSelect(props.index);
    };
      
return (
    <Button
        size="medium"
        variant="outlined"
        onClick={handleIsSelected}
        sx={{
          borderRadius: 20,
          whiteSpace: 'nowrap', // Prevents text from wrapping
          backgroundColor: props.isSelected ? theme.palette.primary.main : 'transparent',
          color: props.isSelected ? '#ffffff' : theme.palette.primary.main,
        }}
      >
        {props.tagChip}
      </Button>
);
};