import Link from "next/link";
import React, {useEffect, useState} from "react";
import {
  Snackbar,
  Alert,
  AppBar,
  Grid,
  Fab,
  useTheme,
  Avatar,
  Tooltip,
  Box,
  Button,
  IconButton, Badge, Drawer, List, ListItem, Typography, ListItemText
} from "@mui/material";
import {styled} from "@mui/system";

import StorefrontIcon from '@mui/icons-material/Storefront';
import LoginIcon from '@mui/icons-material/Login';
import { IconInbox } from "@tabler/icons-react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAtom } from "jotai";

import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity,
  useSnackbar
} from "@/store/snackbar";
import { Searchbar } from "@/components/layout";
import CategoryNavBar from "@/components/layout/CategoryNavBar";
import { DomainImage } from "@/components/shared";
import { useRouter } from 'next/router';
import { LostAndFoundIcon, SignupIcon } from "@/icons";
import { currentUserAtom } from "@/auth";

import { BACKEND_URL, NOTIFICATION_COUNT, NOTIFICATION_LIST } from "@/routes";
import type { User } from "@/auth";
import useProfilePicture from "@/hooks/useProfilePicture";

interface LayoutProps {
  children : React.ReactNode
}

const PageContainer = styled("div")(({theme}) => ({
  backgroundColor : theme.palette.background.default,
  flexGrow : 1,
  position : "relative",
  paddingTop : 10
}))


export default function Layout(props : LayoutProps) {
  
  const theme = useTheme();

  const [currentUser] = useAtom(currentUserAtom);
  const [profileImgSrc, refetch] = useProfilePicture();
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {

      // Define a function to fetch message threads
      const fetchNotificationCount = () => {
        // console.log("currentUser", currentUser)
        if (currentUser != null){
          getNotifiCount(currentUser.uuid);
        }
      }
  
    // Initially, call the function
    fetchNotificationCount();
  
    const intervalId = setInterval(() => fetchNotificationCount(), 2000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const getNotifiCount = async (userId: string) => {

    try {
      const res = await fetch(`${BACKEND_URL}${NOTIFICATION_COUNT}${userId}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
      });
    
      //Message Thread Data saved and processed
      const data = await res.json();
      console.log("Notification Count", data)
      setNotificationCount(data)

    } catch (err: unknown) {
    }
  } 

  const getNotifitionsList = async () => {

    try {
      const res = await fetch(`${BACKEND_URL}${NOTIFICATION_LIST}${currentUser.uuid}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
      });
    
      //Notifications Data saved and processed
      const data = await res.json();
      console.log("data")
      setNotifications([...data].reverse());

      snackbar("success", "Fetched message threads successfully");

      handleDrawerOpen()
  
    } catch (err: unknown) {
      snackbar("error", (err as Error).message);
    }
  } 


  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity] = useAtom(snackbarSeverity);
  const [message] = useAtom(snackbarMessage);

  const snackbar = useSnackbar();

  const router = useRouter();
  const currentURL = router.asPath;
  const [searchValue, setSearchValue] = React.useState<string>("");

  const handleOnSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSearch = () => {
    if (router.asPath.includes("forum")){
      router.replace(`/forum?keywords=${searchValue}`);
    }
    else{
      router.replace(`/search?keywords=${searchValue}`);
    }
  };

  const pathsToShowCategoryBar = [
    '/market',
    '/search',
    '/product',
  ];

  const shouldShowCategoryBar = pathsToShowCategoryBar.some(path => currentURL.includes(path));

  return (
    <>
      {!currentURL.includes("inbox") &&  currentUser !== null && (
        <Fab 
          color="primary"
          sx={{
            position: "absolute",
            right: 25,
            bottom: 25
          }}
          onClick={() => router.replace("/inbox")}
        >
          <Tooltip title="Inbox" arrow>
            <IconInbox color='white'/>
          </Tooltip>
        </Fab>
      )}
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {(!(currentURL.includes("login") || currentURL.includes("register")) && <AppBar position="static" color="secondary" sx={{height : "fit-content", padding : "0.25rem 0.5rem"}}>
        <Grid container sx={{width : "100%"}} alignItems="center">
          <Grid item xs={1} sx={{height : 40 }}>
            <Box
              component="img"
              sx={{
                height: '100%',
                width: 'auto',  
                maxWidth: '100%',
                objectFit: 'contain', 
                display: 'block', 
                marginLeft: 'auto',  
                marginRight: 'auto'
              }}
              alt="campus connect logo"
              src="/app-logo.png"
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item flexGrow={1} sx={{display : "flex", gap : 1, justifyContent : "center" }}>
              <Searchbar 
                input={{
                  value: searchValue,
                  onChange: handleOnSearchChange,
                  fullWidth: true
                }}
                action={{
                  onClick: handleSearch
                }}
              />
            <Button
              size="small"
              startIcon={<StorefrontIcon style={{ fill : theme.palette.primary.main }}/>}
              onClick={() => router.replace("/market")}
              sx={{textTransform : "none"}}
            >
              Market Place
            </Button>
            <Button
              size="small"
              startIcon={<LostAndFoundIcon />}
              onClick={() => router.replace("/forum")}
              sx={{textTransform : "none"}}
            >
              Lost & Found
            </Button>
          </Grid>
          {
            currentUser !== null ?
            <Grid item xs={2} sx={{display : "flex", justifyContent : "right", alignItems: "center", gap : 1}}>
              <Link href={'/product/post'}>
                <Button size="small" variant="contained" sx={{textTransform : "none", height : "fit-content"}}
                  startIcon={<AddCircleOutlineIcon  style={{fill : "#fff"}}/>}
                >
                  List An Item
                </Button>
              </Link>
              <Box style={{marginRight:"10px", marginLeft:"10px"}} >

              <IconButton size="small" onClick={getNotifitionsList}>
                  <Badge badgeContent={notificationCount} color="warning">
                    <NotificationsIcon style={{fill : theme.palette.primary.main}} />
                  </Badge>
              </IconButton>
           
              </Box>
              <Link href={"/profile"}>
                <Avatar 
                  style={{marginRight:"20px"}}
                  src={profileImgSrc}
                />
              </Link>
              
            </Grid>
            :
            <Grid item xs={2} sx={{display : "flex", justifyContent : "right", gap : 1 }}>
              <Link href={"/register"}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<SignupIcon stroke="#fff"/>}
                  sx={{textTransform : "none"}}
                >
                  Sign Up
                </Button>
              </Link>
              
              <Link href="/login">
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<LoginIcon style={{ fill : "#fff" }}/>}
                  sx={{textTransform : "none"}}
                >
                  Login
                </Button>
              </Link>
              
            </Grid>
          }
        </Grid>
      </AppBar>)}

      {(notifications.length > 0 && (<Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={handleDrawerClose}
        sx={{ width: '20vw', '& .MuiDrawer-paper': { width: '20vw' } }} // Set the width here
      >
        <List>
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <ListItemText
                primary={
                  <Typography variant="body1" style={{ fontWeight: notification.seen ? 'normal' : 'bold' }}>
                    {notification.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>))}
      
        {/* Category Bar */}
        {(shouldShowCategoryBar && <CategoryNavBar />)}

      <PageContainer>
        {props.children}
      </PageContainer>
    </>
  )

}
export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}