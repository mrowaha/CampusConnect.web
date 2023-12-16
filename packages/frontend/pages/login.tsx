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
import { AUTH_TOKEN, authAtom, currentUserAtom } from "@/auth";

import {FilledInputField, DomainImage} from "@/components/shared";
import { BACKEND_URL, LOGIN_BILKENTEER, LOGIN_MODERATOR } from "@/routes";
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

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [token, setToken] = useAtom(authAtom);


  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");
  const [loggingIn, setLoggingIn] = React.useState<boolean>(false);

  const snackbar = useSnackbar();

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setLoggingIn(false);
  }, [])

  const handleLogin = async (loginType : "bilkenteer" | "moderator") => {
    flushSync(() => setLoggingIn(true));
    const loginUrl = loginType === "bilkenteer" ? `${BACKEND_URL}${LOGIN_BILKENTEER}` : `${BACKEND_URL}${LOGIN_MODERATOR}`;
    try {
      const res = await fetch(loginUrl, {
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
      if (data.hasOwnProperty("token")) {
        localStorage.setItem(AUTH_TOKEN, data["token"]["accessToken"]);
        setCurrentUser(() => {
          const user = {...data};
          delete user["token"];
          return user;
        })
        setToken(data["token"]["accessToken"]);
        router.replace("/inbox/12363402-04ab-4819-8619-20ea0556507f/deniz");
        return;
      } else if ("errors" in data) {
        throw new Error(data["errors"][0]);
      }
    } catch (err) {
        snackbar("error", (err as Error).message);
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
            onClick={() => handleLogin("bilkenteer")}
            sx={{
              textTransform : "none"
            }}>
            Login As Bilkenteer
          </Button>
          <Button
            onClick={() => handleLogin("moderator")}
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

