import * as React from "react";
import { useAtom } from "jotai";
import {
  AppBar,
  Grid,
  Button,
  Snackbar,
  Alert,
  Modal,
  Box,
  useTheme,
  Typography,
  TextField,
  IconButton
} from "@mui/material";
import {styled} from "@mui/system";
import accessAtom from "@/store/access";
import { snackbarAtom, snackbarSeverity, snackbarMessage  } from "@/store/snackbar";
import { DomainImage } from "@/components/shared";
import { API_KEY } from "@/routes";
import { CloseOutlined } from "@mui/icons-material";

interface LayoutProps {
  children : React.ReactNode
}

const PageContainer = styled("div")(({theme}) => ({
  backgroundColor : theme.palette.background.default,
  flexGrow : 1,
  position : "relative",
}))


const ErrorPageContainer = styled("div")(({theme}) => ({
  flexGrow : 1,
  backgroundColor : theme.palette.background.default,
  display : "flex",
  justifyContent : "center",
  alignItems : "center"
}))

export default function Layout(props : LayoutProps) {
  
  const[access] = useAtom(accessAtom);
  const theme = useTheme();

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity, __] = useAtom(snackbarSeverity);
  const [message, ___] = useAtom(snackbarMessage);

  const [showCredentials, setShowCredentials] = React.useState<boolean>(false);


  if (access === false) {
    return (
      <ErrorPageContainer>
        <Box
          sx={{
            border : "1px solid black",
            padding: "2rem" 
          }}
        >
          <div style={{width : "20vw", height : 100, marginBottom : 10}}>
            <DomainImage 
              alt="campus connect admin logo"
              src="/app-logo-admin.png"
            />  
          </div>
          <Typography>
            Unauthorized Access
          </Typography>
        </Box>
      </ErrorPageContainer>
    )    
  }


  return (
    <>
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Modal
        open={showCredentials}
        sx={{display : "flex", justifyContent :"center", alignItems : "center"}}
      >
      <Box
        sx={{
          backgroundColor : theme.palette.background.default,
          padding : "2rem",
          borderRadius : 5,
          width : "30%",
          minWidth : 400,
          position : "relative"
        }}
      >
        <IconButton
          size="small"
          sx={{position : "absolute", top : -10, right :-10, backgroundColor: "red"}}
          onClick={() => setShowCredentials(false)}
        >
          <CloseOutlined style={{fill : "white"}} />
        </IconButton>

        <TextField 
          disabled
          value={API_KEY}
          label="API KEY"
          multiline
          fullWidth
        />
      </Box>

      </Modal>
      <AppBar position="static" color="secondary" sx={{height : "fit-content", padding : "0.25rem 0.5rem"}}>
        <Grid container sx={{width : "100%"}} alignItems="center" justifyContent="space-between" gap={10}>
          <Grid item xs={1} sx={{height : 40 }}>
            <DomainImage 
              alt="campus connect admin logo"
              src="/app-logo-admin.png"
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              size="small"
              sx={{textTransform : "none"}}
              onClick={() => setShowCredentials(true)}
            >
              View Credentials
            </Button>
          </Grid>
        </Grid>
      </AppBar>
      <PageContainer>
        {props.children}
      </PageContainer>
    </>
  )

}