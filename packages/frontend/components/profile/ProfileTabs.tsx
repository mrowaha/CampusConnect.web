import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};
 
export const TabButtons = () => {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Transactions" />
          <Tab label="Products" />
          <Tab label="Forum Posts" />
          <Tab label="Notifications" />
          
          <Tab label="Wishlist" />
          <Tab label="Subscribed Tags" />
          <Tab label="Inbox" />
        </Tabs>
      </Paper>
    );
};