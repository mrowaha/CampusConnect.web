import * as React from "react";

import {
  Modal,
  Box,
  IconButton,
  useTheme,
  Grid,
  Typography,
  Divider,
  Button
} from "@mui/material"
import { CloseOutlined } from "@mui/icons-material";

import { FilledInputField } from "@/components/shared";
import { useSnackbar } from "@/store/snackbar";

import type { NewModeratorInfo } from "@/pages";

interface RegisterModalProps {
  open : boolean;
  onModalClose: () => void;
  onRegister: (info :  NewModeratorInfo) => Promise<void> | void;
}

export default function RegisterModal(props : RegisterModalProps) {

  const theme = useTheme();
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");
  const [registering, setRegistering] = React.useState<boolean>(false);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setRegistering(false);
  }, [])

  const handleRegistertion = React.useCallback(() => {
    props.onRegister({
      firstName : firstname,
      lastName : lastname,
      email : email,
      password : password
    })
  }, [firstname, lastname, email, password]);

  return (
    <Modal
      open={props.open}
      sx={{
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
      }}
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
          onClick={() => props.onModalClose()}
        >
          <CloseOutlined style={{fill : "white"}} />
        </IconButton>

        <Grid container gap={2} justifyContent="space-between">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" color="primary">
              Register New Moderator
            </Typography>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item xs={5}>
            <FilledInputField
            disabled={registering}
            placeholder="FirstName"
            label="First Name"
            fullWidth
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            multiline={false}
            size="small"
            background="white"
            hoverbackground={theme.palette.secondary.light}
            focusedbackground={theme.palette.secondary.light}
          />
          </Grid>
          <Grid item xs={5}>
            <FilledInputField
            disabled={registering}
            placeholder="LastName"
            label="Last Name"
            fullWidth
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            multiline={false}
            size="small"
            background="white"
            hoverbackground={theme.palette.secondary.light}
            focusedbackground={theme.palette.secondary.light}
          />
          </Grid>
        </Grid>
        <div style={{margin : "10px 0"}}>
          <FilledInputField
            disabled={registering}
            placeholder="Email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            multiline={false}
            size="small"
            background="white"
            hoverbackground={theme.palette.secondary.light}
            focusedbackground={theme.palette.secondary.light}
          />
        </div>
        <FilledInputField 
          disabled={registering}
          placeholder="Password"
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          multiline={false}
          size="small"
          background="white"
          hoverbackground={theme.palette.secondary.light}
          focusedbackground={theme.palette.secondary.light}
        />

        <Button fullWidth variant="contained" color="primary" sx={{marginTop : "10px"}} 
          onClick={handleRegistertion}
        >
          Register Moderator
        </Button>
      </Box>
    </Modal>
  )

}