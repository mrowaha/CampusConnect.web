import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase, {InputBaseProps} from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useTheme } from '@mui/material';

export type SearchbarProps = {
  "input" : InputBaseProps,
  "action" : IconButtonProps
}

export function Searchbar(props : SearchbarProps) {

  const theme = useTheme();

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    > 

      <InputBase
        size='small'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Marketplace"
        inputProps={{ 'aria-label': 'search google maps' }}
        {...props.input}
      />
      <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
      <IconButton size='small' aria-label="search" {...props.action}>
        <SearchIcon fontSize="small" style={{fill : theme.palette.primary.main}} />
      </IconButton>
    </Paper>
  );
}
