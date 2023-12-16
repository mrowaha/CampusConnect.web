import { useRouter } from "next/router";
import React from "react";
import {atom, useAtom} from "jotai";
import { useSnackbar } from "./store/snackbar";
import { BACKEND_URL, VALIDATE_TOKEN } from "./routes";

import {
  CircularProgress,
} from "@mui/material";

const AuthError = class extends Error {
  constructor(message : string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export type User = {
  uuid : string;
  firstName : string;
  lastName : string;
  role : "BILKENTEER" | "MODERATOR";
  email : string;
  trustScore? : 0 | 1 | 2 | 3 | 4 | 5;
}

export const currentUserAtom = atom<User | null>(null);

export const AUTH_TOKEN = "cc-token";
export const authAtom = atom<string | null>(null);

interface ProtectedRouteProps {
  children : React.ReactNode;
}

export default function ProtectedRoute(props : ProtectedRouteProps) {

  const snackbar = useSnackbar();
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  
  const [_, setAuthToken] = useAtom(authAtom);
  const [__, setCurrentUser] = useAtom(currentUserAtom);

  const router = useRouter();

  React.useLayoutEffect(() => {
    let storedToken = localStorage.getItem(AUTH_TOKEN);
    if (!storedToken) {
      snackbar("error", "Login Required");
      router.replace('/login');
      setAuthorized(false);
      return;
    }

    //localstorage has an underlying token
    const validateToken = async () => {
      
      try {
        const res = await fetch(`${BACKEND_URL}${VALIDATE_TOKEN}`, {
          headers : {
            "Authorization" : `Bearer ${storedToken}`
          }
        });
        if (res.status != 200) {
          throw new AuthError("Login Required")
        }
        const data = await res.json();
        if (data.hasOwnProperty("uuid")) {
          setCurrentUser(() => {
            const user = {...data};
            delete user["token"];
            return user;
          })
          setAuthToken(prev => {
            if (prev == storedToken) return prev;
            return storedToken;
          });
          setAuthorized(true);
          return;
        } else if ("errors" in data) {
          throw new AuthError(data["errors"][0]);
        } else {
          throw new Error();
        }
      } catch (err) {
          if (err instanceof AuthError) {
            snackbar("error", (err as Error).message);
          } else {
            snackbar("error", "Unknown Error Occured");
          }
          console.error(err);
          setAuthorized(false);
          setAuthToken(null);
          setCurrentUser(null);
          localStorage.removeItem(AUTH_TOKEN);
          router.replace("/login");
      }
    }
    validateToken();
  }, [])

  if (!authorized) {
    return (
      <>
      {
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
      </>
    )
  }

  return (
    <>
      {props.children}
    </>
  )

}