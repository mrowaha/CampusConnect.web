import * as React from "react";
import {createPortal} from "react-dom";

import { 
  Container,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  CircularProgress,
  Chip,
  useTheme,
  Typography,
  Button,
  Grid,
  Fab,
  Alert
} from "@mui/material";
import { useAtom } from "jotai";
import accessAtom from "@/store/access";
import BACKEND_URL, { ALL_MODERATORS, API_KEY, MODERATOR_CREATION, SUSPEND_MODERATOR, UNSUSPEND_MODERATOR } from "@/routes";
import AuthError from "@/exceptions/AuthError";
import { flushSync } from "react-dom";
import { useSnackbar } from "@/store/snackbar";
import { DomainImage } from "@/components/shared";
import { Add } from "@mui/icons-material";
import RegisterModal from "@/components/moderator/RegisterModal";
import useMultiSnackbar from "@/store/multistack";

export interface ModeratorInfo {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export type NewModeratorInfo =     
{ 
  [key in keyof Omit<ModeratorInfo, "uuid">] : ModeratorInfo[key];
} | {password : string};

export default function Home() {

  const theme = useTheme();
  const snackbar = useSnackbar();
  const {enqueueSnackbar} = useMultiSnackbar();
  const [_, setAccess] = useAtom(accessAtom);

  const [moderators, setModerators] = React.useState<ModeratorInfo[]>([]);
  const [status, setStatus] = React.useState<"error" | "success" | "loading">("loading");
  
  const [registerModal, setRegisterModal] = React.useState<boolean>(false); 

  const fetchModerators = async () => {
    try {
      console.log(API_KEY);
      const res = await fetch(`${BACKEND_URL}${ALL_MODERATORS}`, {
        method: "GET",
        headers : {
          "x-api-key" : `${API_KEY}`
        }
      });
      if (res.status === 401) {
        throw new AuthError("unauthorized")
      }
      const data = await res.json();
      setModerators(data);
      setAccess(true);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setAccess(false);
    }
  }

  const registerModerator = async (registerationInfo : NewModeratorInfo) => {
    try {
      const res = await fetch(`${BACKEND_URL}${MODERATOR_CREATION}`, {
        method : "POST",
        headers : {
          "x-api-key" : `${API_KEY}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          ...registerationInfo
        })
      })
      if (res.status === 401) {
        throw new AuthError("unauthorized");
      } else if (res.status === 500) {
        snackbar("error", "internal server error");
        return;
      }
      const data = await res.json();
      if (data.hasOwnProperty("errors")) {
        (data.errors as string[]).forEach(error => enqueueSnackbar(
          <Typography sx={{color: "white"}}>{error}</Typography>, 
          {variant : "error", hideIconVariant :false})
        );
        return;
      } else if (data.hasOwnProperty("uuid")) {
        setModerators(prev => [...prev, data]);
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setAccess(false);
      } else {
        snackbar("error", (err as Error).message)
      }
    } finally {
      setRegisterModal(false);
    }

  };

  React.useEffect(() => {
    setStatus("loading");
    fetchModerators();
  }, []);


  const handleAccountSuspend = async (uuid : string) => {
    try {
      const res = await fetch(`${BACKEND_URL}${SUSPEND_MODERATOR}`, {
        method : "PUT",
        headers : {
          "x-api-key" : `${API_KEY}`,
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          uuid : uuid
        })
      })

      if (res.status === 401) {
        throw new AuthError("unauthorized");
      } else if (res.status === 500) {
        snackbar("error", "internal server error");
        return;
      }
      const data = await res.json();
      if (data.hasOwnProperty("user")) {
        const suspenduser = data.user as ModeratorInfo;
        snackbar("success", "moderator suspended");
        console.log(suspenduser);
        setModerators(prev => {
          const index = prev.findIndex(moderator => moderator.uuid === suspenduser.uuid);
          return prev.with(index, suspenduser);
        })
      } else if (data.hasOwnProperty("errors")) {
        snackbar("error", data.errors[0]);        
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setAccess(false);
      } else {
        snackbar("error", (err as Error).message)
      }
    }
  }

  const handleAccountUnSuspend = async (uuid : string) => {
    try {
      const res = await fetch(`${BACKEND_URL}${UNSUSPEND_MODERATOR}`, {
        method : "PUT",
        headers : {
          "x-api-key" : `${API_KEY}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          uuid : uuid
        })
      })

      if (res.status === 401) {
        throw new AuthError("unauthorized");
      } else if (res.status === 500) {
        snackbar("error", "internal server error");
        return;
      }
      const data = await res.json();
      if (data.hasOwnProperty("user")) {
        const suspenduser = data.user as ModeratorInfo;
        snackbar("success", "moderator unsuspended");
        setModerators(prev => {
          const index = prev.findIndex(moderator => moderator.uuid === suspenduser.uuid);
          return prev.with(index, suspenduser);
        })
      } else if (data.hasOwnProperty("errors")) {
        snackbar("error", data.errors[0]);        
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setAccess(false);
      } else {
        snackbar("error", (err as Error).message)
      }
    }
  }

  if (status == "loading") {
    return (
      <div
        style={{
          position : "absolute",
          inset : "0",
          backgroundColor : "rgba(0,0,0,0.5)",
          zIndex : 999,
          display : "flex",
          justifyContent : "center",
          alignItems : "center"
        }}
      >
        <CircularProgress
          color="primary" 
          size={80}
          thickness={3}
        />
      </div>      
    )
  }

  if (status ===   "error") {
    return (<></>)
  }

  return (
    <> 
    {
      createPortal(
        <Fab 
          color="primary"
          sx={{
            position : "absolute",
            right : 5,
            bottom : 5
          }}
          onClick={() => setRegisterModal(true)}
        >
          <Add style={{fill : "white"}}/>
        </Fab>,
        document.getElementById("fab-div") as HTMLElement
      )
    }
    <RegisterModal 
      open={registerModal}
      onModalClose={() => {setRegisterModal(false)}}
      onRegister={registerModerator}
    />
    <Container>
      <Grid container gap={1} justifyContent="space-between" sx={{marginBottom : 2}}>
        <Grid item xs={6}>
          <DomainImage 
            src="/app-logo-admin.png"
            alt="admin logo"
          />
        </Grid>
        <Grid item xs={5} display="flex" alignItems="center" justifyContent="center">
          <Typography color="primary" variant="h3">
            Manage Moderators
          </Typography>
        </Grid>
      </Grid>

      <div style={{width : "100%", backgroundColor : "grey", height : "2px", marginBottom : 10}} /> 
      <TableContainer component={Paper}>
        <Table sx={{minWidth : 650}}>
          <TableHead>
            <TableRow
              sx={{

                backgroundColor: theme.palette.primary.main,
              }}
            >
              <TableCell sx={{color : "white"}} align="left">Email</TableCell>
              <TableCell sx={{color : "white"}} align="left">First Name</TableCell>
              <TableCell sx={{color : "white"}} align="left">Last Name</TableCell>
              <TableCell sx={{color : "white"}} align="left">Status</TableCell>
              <TableCell sx={{color : "white"}} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              moderators.map(moderator => (
                <TableRow key={moderator.uuid}>
                  <TableCell>{moderator.email}</TableCell>
                  <TableCell>{moderator.firstName}</TableCell>
                  <TableCell>{moderator.lastName}</TableCell>
                  <TableCell>
                    {
                      moderator.isActive? <Chip  color="success" label={<Typography sx={{color : "white"}}>active</Typography>} />
                      : <Chip  color="error" label={<Typography sx={{color : "white"}}>inactive</Typography>}/>
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      moderator.isActive ?
                      <Button size="small" variant="contained" onClick={() => handleAccountSuspend(moderator.uuid)}>suspend account</Button>
                      : <Button size="small" variant="contained" onClick={() => handleAccountUnSuspend(moderator.uuid)}>unsuspend account</Button>
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    <div 
      style={{width : "100%", height : "100px"}}
    />
    </>
  )
}
