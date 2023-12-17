import React from 'react';
import{
    Box,
    TextField,
    Grid,
    IconButton,
    Button,
    useTheme,
}  from '@mui/material';

//import ReportIcon from '@mui/icons-material/Report';
import {  DeleteIcon, EnterCommentIcon, ReportIcon, ShareIcon } from "@/icons";


export const HeaderCreatePost = ({}) => {
  const theme = useTheme();
  const [isPostSelected, setPostSelected] = React.useState<boolean>(false); // by default in lost forum
  const [isDeleteSelected, setDeleteSelected] = React.useState(false);

  const handlePost = () => {
    setPostSelected(!isPostSelected);
      // Implement comment functionality
  };

  const handleDelete = () => {
    setDeleteSelected(!isDeleteSelected);
  };

  return (
    <Box 
        sx={{
            backgroundColor: theme.palette.secondary.light ,
            width: '100%',
        }}
        display="flex" alignItems="center"  padding="2px"
    >
      {/* Create Post Button */}
      <Grid container alignItems="center" padding="5px"  >
  <Grid item xs={8} >
    <Button
      size="medium"
      variant="outlined"
      onClick={handlePost}
      sx={{
        backgroundColor: theme.palette.primary.main ,
        color:  '#ffffff' ,
      }}
    >
      Post
    </Button>
  </Grid>
  <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <IconButton onClick={handleDelete} sx={{ color: theme.palette.primary.main }}>
      <DeleteIcon filled={true} />
    </IconButton>
  </Grid>
</Grid>
    </Box>
  );
};


