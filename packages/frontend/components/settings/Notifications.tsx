import React from 'react';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
} from '@mui/material';

interface NotificationsProps {
    showMyProducts: boolean;
    showMyInbox: boolean;
    showMyForumPosts: boolean;
    showMyWishlist: boolean;
    showMyBids: boolean;
    handleShowMyProducts: any;
    handleShowMyInbox : any ;
    handleShowMyForumPosts: any;
    handleShowMyWishlist: any;
    handleShowMyBids: any;
  }
  
export const Notifications: React.FC<NotificationsProps> = ({
    showMyProducts,
    showMyInbox,
    showMyForumPosts,
    showMyWishlist,
    showMyBids,
    handleShowMyProducts,
    handleShowMyInbox,
    handleShowMyForumPosts,
    handleShowMyWishlist,
    handleShowMyBids,
  }) => {
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Show Notifications
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={showMyProducts} onChange={handleShowMyProducts} />}
              label="My Products"
            />
            <FormControlLabel
              control={<Switch checked={showMyInbox} onChange={handleShowMyInbox} />}
              label="My Inbox"
            />
            <FormControlLabel
              control={<Switch checked={showMyForumPosts} onChange={handleShowMyForumPosts} />}
              label="My Forum Posts"
            />
            <FormControlLabel
              control={<Switch checked={showMyWishlist} onChange={handleShowMyWishlist} />}
              label="My Wishlists"
            />
            <FormControlLabel
              control={<Switch checked={showMyBids} onChange={handleShowMyBids} />}
              label="My Bids"
            />
          </FormGroup>
    </FormControl>
  );
};
