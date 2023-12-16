import Link from "next/link";
import * as React from "react";

import { useAtom } from "jotai";

import {
  Snackbar,
  Alert,
  AppBar,
  Grid,
  Button,
  useTheme,
  Avatar,
  IconButton
} from "@mui/material";
import {styled} from "@mui/system";
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity,
  useSnackbar
} from "@/store/snackbar";
import { Searchbar } from "@/components/layout";
import { DomainImage } from "@/components/shared";

import { LostAndFoundIcon, SignupIcon } from "@/icons";
import { currentUserAtom } from "@/auth";

import { BACKEND_URL, PROFILE_PICTURE } from "@/routes";
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

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity] = useAtom(snackbarSeverity);
  const [message] = useAtom(snackbarMessage);

  const snackbar = useSnackbar();

  const [searchValue, setSearchValue] = React.useState<string>("");
  const handleOnSearchChange = React.useCallback((e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (e !== undefined) {
      setSearchValue(e.target.value);
    }
  }, [])

  React.useEffect(() => {
    setSearchValue("");
  }, [])


  return (
    <>
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <AppBar position="static" color="secondary" sx={{height : "fit-content", padding : "0.25rem 0.5rem"}}>
        <Grid container sx={{width : "100%"}} alignItems="center">
          <Grid item xs={1} sx={{height : 40 }}>
            <DomainImage 
              alt="campus connect logo"
              src="/app-logo.png"
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item flexGrow={1} sx={{display : "flex", gap : 1, justifyContent : "center" }}>
            <Searchbar 
              input={{
                value : searchValue,
                onChange : handleOnSearchChange,
                fullWidth : true
              }}
              action={{
                onClick : () => snackbar("warning", "Search Not Implemented")
              }}
            />
            <Button
              size="small"
              startIcon={<StorefrontIcon style={{ fill : theme.palette.primary.main }}/>}
              sx={{textTransform : "none"}}
            >
              Market Place
            </Button>
            <Button
              size="small"
              startIcon={<LostAndFoundIcon />}
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
              
              <IconButton size="small">
                <NotificationsIcon style={{fill : theme.palette.primary.main}} />
              </IconButton>
              <Avatar 
                src={profileImgSrc}
              />
            </Grid>
            :
            <Grid item xs={2} sx={{display : "flex", justifyContent : "right", gap : 1 }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<SignupIcon stroke="#fff"/>}
                sx={{textTransform : "none"}}
              >
                Sign Up
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<LoginIcon style={{ fill : "#fff" }}/>}
                sx={{textTransform : "none"}}
              >
                Login
              </Button>
            </Grid>
          }
        </Grid>
      </AppBar>
      <PageContainer>
        {props.children}
      </PageContainer>
    </>
  )

}