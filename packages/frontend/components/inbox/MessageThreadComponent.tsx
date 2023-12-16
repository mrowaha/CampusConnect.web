import React, { useState } from 'react';
import { Tooltip, useTheme, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface MessageThread {
  name: string;
  avatar: string;
  unreadCount: number;
  id: string;
}

interface SidebarProps {
  users: User[];
}

const MessageThreadComponent: React.FC<SidebarProps> = ({ users, onSelectThread }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search 
  
  const theme = useTheme();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter users based on the search term

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <TextField
        fullWidth
        placeholder="Search User"
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on change
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color={theme.palette.primary.light}/>
            </InputAdornment>
          ),
        }}
      />

     <List>
        {filteredUsers.map((user) => ( // Use filteredUsers here
          <ListItem button key={user.id} style={{ marginTop: 5 }} onClick={() => onSelectThread(user)}>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
            {user.unreadCount > 0 && (
              <Tooltip title="Unread Messages" arrow>
                <Badge badgeContent={user.unreadCount} color="secondary" />
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageThreadComponent;
