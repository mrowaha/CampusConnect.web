import React from 'react';
import { Box, Typography, useTheme, Tooltip } from '@mui/material';
import { IconChecks } from "@tabler/icons-react";

interface MessageProps {
  content: string;
  time: string;
  seen: boolean;
  isSender: boolean; // true if the current user sent the message, false if received
}

const MessageComponent: React.FC<MessageProps> = ({ content, time, seen, isSender }) => {
    const theme = useTheme();

    const messageBoxStyle = {
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start'
      };
    
      const messageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSender ? 'flex-end' : 'flex-start',
        margin: '10px',
        padding: '10px',
        backgroundColor: isSender ? theme.palette.primary.main : theme.palette.primary.light,
        borderRadius: '10px',
        maxWidth: '75%',
      };

  const timeStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
    color: '#757575',
    fontSize: '0.75rem',
  };

  return (
    <Box sx={messageBoxStyle}>
      <Box sx={messageStyle}>
      <Typography color={'white'} variant="body1">{content}</Typography>
      <Box sx={timeStyle}>
        <Typography color={theme.palette.secondary.light} variant="caption">{time}</Typography>
        {seen && isSender && (
            <Tooltip title="Seen" arrow>
                <IconChecks color='white' style={{marginLeft:"5px"}} size={20}/>
          </Tooltip>
        )}
      </Box>
    </Box>
</Box>
  );
};

export default MessageComponent;
