import React, {useEffect, useState} from 'react';
import{
    Box,
    TextField,
    Grid,
    IconButton,
    useTheme,
}  from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
//import ReportIcon from '@mui/icons-material/Report';
import { CommentIcon, EnterCommentIcon, ReportIcon, ShareIcon } from "@/icons";


export const CommentBar = ({onComment}) => {
  const theme = useTheme();
  const [comment, setComment] = useState(""); // State to store the comment

  const handleComment = () => {
    // Use the comment state here
    console.log("Comment:", comment);
    setComment("");
    onComment(comment); 
  };

  const handleShare = () => {
      // Implement share functionality
  };

  const handleReport = () => {
      // Implement report functionality
  };

  return (
    <Box 
      display="flex" alignItems="center" justifyContent="space-between" padding="2px"
    >
      {/* Comment Box */}
      <Grid container > 
        <Grid item xs={7}  >
          <TextField
              variant="outlined"
              placeholder="Leave a comment..."
              fullWidth
              margin="dense"
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
              endAdornment: (
                  <IconButton edge="end" onClick={handleComment} sx={{ color: theme.palette.primary.main }}>
                  <EnterCommentIcon  filled={ true} />
                  </IconButton>
              ),
              }}
          />
        </Grid>
        {/* Share and Report Icons */}
        <Grid container item xs={5} alignItems="center" justifyContent="flex-end" >
          <Grid item >
            <IconButton onClick={handleShare} sx={{ color: theme.palette.primary.main }}>
              <ShareIcon filled={true} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleReport} sx={{ color: theme.palette.primary.main }}>
              <ReportIcon filled={ true} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};


