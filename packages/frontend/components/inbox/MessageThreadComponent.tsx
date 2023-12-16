import React, { useState } from 'react';
import { Tooltip, useTheme, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface User {
  name: string;
  avatar: string;
  isModeration: boolean;
  unreadCount: number;
  id: string;
}

interface SidebarProps {
  users: User[];
}

const MessageThreadComponent: React.FC<SidebarProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  // const [currentUserList, setCurrentUserList] = useState([]); // State to hold the search term

  // React.useEffect(() => {
  //   setCurrentUserList(users);
  // }, [])


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
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

     <List>
        {filteredUsers.map((user) => ( // Use filteredUsers here
          <ListItem button key={user.id} style={{ marginTop: 5 }}>
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
