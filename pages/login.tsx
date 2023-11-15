import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  useTheme,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";
import {authAtom, AUTH_TOKEN} from "@/auth";

import {FilledInputField, DomainImage} from "@/components/shared";
import { BACKEND_URL, LOGIN_BILKENTEER } from "@/routes";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";

const LoginStack = styled(Stack)(({theme}) => ({
  background : theme.palette.secondary.main,
  width : "fit-content",
  position : "absolute",
  top : "50%",
  left : "50%",
  transform : "translate(-50%, -50%)",
  padding : "1rem",
  borderRadius : "5px",
  alignItems : "center"
}))


export default function LoginPage() {

  const router = useRouter();
  const theme = useTheme();
  const [_, setAuthToken] = useAtom(authAtom);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");
  const [loggingIn, setLoggingIn] = React.useState<boolean>(false);

  const snackbar = useSnackbar();

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setLoggingIn(false);
    // snackbar("success", "Welcome to Campus Connect");
  }, [])

  const handleLogin = async () => {
    flushSync(() => setLoggingIn(true));
    try {
      const res = await fetch(`${BACKEND_URL}${LOGIN_BILKENTEER}`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email : email,
          password : password
        })
      })
  
      const data = await res.json();
      if ("accessToken" in data) {
        localStorage.setItem(AUTH_TOKEN, data["accessToken"]);
        setAuthToken(data["accessToken"]);
        router.replace("/protected");
        return;
      } else if ("error" in data) {
        throw new Error(data["error"]);
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (err : unknown) {
      if (err instanceof Error) {
        snackbar("error", err.message);
      } else {
        snackbar("error", "Unknown error occured");
      }
    } finally {
      setLoggingIn(false);
    }
  } 

  return (
    <>
      {
        loggingIn && 
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
      <LoginStack
        gap={2}
      >
        <DomainImage 
          src="/app-logo.png"
          alt="campus connect logo"
        />
        <FilledInputField
          disabled={loggingIn}
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
          disabled={loggingIn}
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

        <Button 
          disabled={loggingIn}
          size="small"
          variant="text"
          sx={{
            textTransform : "none",
            width : "fit-content"
          }}
        >
        Forgot your password?
        </Button>

        <ButtonGroup
          disabled={loggingIn}
          size="small"
          fullWidth
          variant="contained"
        >
          <Button
            onClick={handleLogin}
            sx={{
              textTransform : "none"
            }}>
            Login As Bilkenteer
          </Button>
          <Button
            color="secondary"
            sx={{
              textTransform : "none",
            }}
          >
            Login As Moderator
          </Button>
        </ButtonGroup>
        <div style={{width : "100%", height : "1px", backgroundColor : theme.palette.background.default}} />
        <Typography variant="h6" color="primary">
          Do you not have an account yet?
        </Typography>
        <Link href={"/register"}>
          <Button
            disabled={loggingIn}
            size="small"
            variant="outlined"
            sx={{
              textTransform : "none",
              width : "fit-content"
            }}
          >
            Create Bilkenteer Account 
          </Button>
        </Link>
      </LoginStack>
    </>
  )
}