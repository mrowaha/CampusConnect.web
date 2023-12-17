import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}
 
export const TabButtons = ({ activeTabIndex , handleChange}) => {
    const [value, setValue] = React.useState(activeTabIndex);
  
    const handlerChange = (event, newValue) => {
      handleChange(newValue);
    };
  
    return (
      <Paper>
        <Tabs
          value={value}
          onChange={handlerChange}
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