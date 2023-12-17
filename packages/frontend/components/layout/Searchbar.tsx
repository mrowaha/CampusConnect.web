import * as React from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import { useSnackbar } from '...'; // Import useSnackbar from your project

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';

export type SearchbarProps = {
  input: InputBaseProps;
  action: IconButtonProps;
};

export function Searchbar(props: SearchbarProps) {
  const theme = useTheme();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      props.action.onClick?.(event); // Call the onClick handler
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        size='small'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Marketplace"
        inputProps={{ 'aria-label': 'search marketplace' }}
        {...props.input}
        onKeyDown={handleKeyDown}
      />
      <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
      <IconButton size='small' aria-label="search" {...props.action}>
        <SearchIcon fontSize="small" style={{fill : theme.palette.primary.main}} />
      </IconButton>
    </Paper>
  );
}

