import React from 'react';
import{
    Box,
    TextField,
    Grid,
    IconButton,
    useTheme,
}  from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';


export const CommentBar = () => {
    const theme = useTheme();
    const handleComment = () => {
        // Implement comment functionality
    };

    const handleShare = () => {
        // Implement share functionality
    };

    const handleReport = () => {
        // Implement report functionality
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" padding="2px">
        {/* Comment Box */}
        <TextField
            variant="outlined"
            placeholder="Leave a comment..."
            fullWidth
            margin="dense"
            size="small"
            InputProps={{
            endAdornment: (
                <IconButton edge="end" onClick={handleComment} sx={{ color: theme.palette.primary.main }} >
                <ChatBubbleIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
            ),
            }}
        />

        {/* Share and Report Icons */}
        <Grid container spacing={2} paddingLeft={50}>
            <Grid item>
            <IconButton onClick={handleShare} sx={{ color: theme.palette.primary.main }}>
                <ShareIcon sx={{ color: theme.palette.primary.main }}/>
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton onClick={handleReport} sx={{ color: theme.palette.primary.main }}>
                <ReportIcon sx={{ color: theme.palette.primary.main }}/>
            </IconButton>
            </Grid>
        </Grid>
        </Box>
    );
};


