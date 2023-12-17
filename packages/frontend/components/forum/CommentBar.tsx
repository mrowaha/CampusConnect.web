import React from 'react';
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
import ReportDialog from '../shared/ReportDialog';


export const CommentBar = ({onReportSubmit  }) => {
  const theme = useTheme();
   // report post 
  const [reportDialogOpen, setReportDialogOpen] = React.useState<boolean>(false);

  const handleReportButtonClick = () => {
    setReportDialogOpen(true);
  };

  const handleReportDialogClose = () => {
    setReportDialogOpen(false);
  };
  const handleReportSubmit = (reportData) => {
   // Call the parent callback with the report data
   onReportSubmit(reportData);

   // Close the dialog
   handleReportDialogClose();
  };
  const handleComment = () => {
      // Implement comment functionality
  };

  const handleShare = () => {
   
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
            <IconButton onClick={handleReportButtonClick} sx={{ color: theme.palette.primary.main }}>
              <ReportIcon filled={ true} />
            </IconButton>
            <ReportDialog
              open={reportDialogOpen}
              onClose={handleReportDialogClose}
              onReportSubmit={handleReportSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};


