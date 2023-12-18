import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  Grid,
  useTheme,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";

import {FilledInputField, DomainImage} from "@/components/shared";
import { BACKEND_URL, REGISTER_BILKENTEER } from "@/routes";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";

const RegisterStack = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.default,
  width: "90%", // Changed from 'fit-content' to a percentage or fixed width
  maxWidth: "600px", // Max-width for larger screens
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "1.5rem", 
  borderRadius: "15px",
  alignItems: "center",
  border: `1px solid ${theme.palette.primary.main}`,
}));


export default function RegisterPage() {

  /** a successful registration request will ignore the generated JWT
   * and instead redirect to login page
   */

  const router = useRouter();
  const theme = useTheme();
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");
  const [registering, setRegistering] = React.useState<boolean>(false);

  const [otp ,setOtp] = React.useState<string>("");

  const snackbar = useSnackbar();

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setRegistering(false);
  }, [])

  const handleRegister = async () => {
    flushSync(() => setRegistering(true));
    try {
      const res = await fetch(`${BACKEND_URL}${REGISTER_BILKENTEER}`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          firstName : firstname,
          lastName : lastname,
          email : email,
          password : password,
          otp: otp
        })
      })
      
      const data = await res.json();
      if(data.hasOwnProperty("accessToken")) {
        // do not store this accessToken, redirect to login
        snackbar("success", "Account Created");
        router.replace("/login");
      } else if ("errors" in data) {
        throw new Error(data["errors"][0]);
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (err : unknown) {
      snackbar("error", (err as Error).message);
    } finally {
      setRegistering(false);
    }
  } 

  const handleOTPSend = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/otp`, {
        method : "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email : email          
        })
      })

      if (res.ok) {
        snackbar("success", "otp was sent");
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      snackbar("error", "An unknown error occured");
    }
  }

  return (
    <>
      {
        registering && 
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
      }
      <RegisterStack
        gap={2}
      >
        <DomainImage 
          src="/app-logo.png"
          alt="campus connect logo"
        />
        <Grid container gap={0.5} justifyContent="space-between">
          <Grid item xs={5.75}>
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
          <Grid item xs={5.75}>
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
        <div style={{display : "flex", justifyContent : "space-between", alignItems : "center", width : "100%"}}>
          <div style={{display : "flex", gap :2}}>
            <TextField 
              label="OTP"
              placeholder="Enter OTP"
              size="small"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              size="small"
              variant="outlined"
              onClick={handleOTPSend}
              sx={{
                textTransform : "none"
              }}>
              Send OTP
            </Button>
          </div>

          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{
              textTransform : "none"
            }}>
            Register As Bilkenteer
          </Button>
        </div>
        <div style={{width : "100%", height : "1px", backgroundColor : theme.palette.background.default}} />
        <Typography variant="h6" color="primary">
          Already have an account?
        </Typography>
        <Link href={"/login"}>
          <Button
            disabled={registering}
            size="small"
            variant="outlined"
            sx={{
              textTransform : "none",
              width : "fit-content"
            }}
          >
            Log In 
          </Button>
        </Link>
      </RegisterStack>
    </>
  )
}