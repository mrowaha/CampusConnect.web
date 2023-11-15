import { useRouter } from "next/router";
import React from "react";
import {atom, useAtom} from "jotai";
import { useSnackbar } from "./store/snackbar";
import { BACKEND_URL, PROTECTED_BILKENTEER } from "./routes";

export const authAtom = atom<string | null>(null);
export const AUTH_TOKEN = "cc-token";

interface ProtectedRouteProps {
  children : React.ReactNode;
}

export default function ProtectedRoute(props : ProtectedRouteProps) {

  const snackbar = useSnackbar();
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  const [authToken, setAuthToken] = useAtom(authAtom);
  const router = useRouter();

  React.useEffect(() => {
    let storedToken = authToken;
    if (storedToken == null) {
      storedToken = localStorage.getItem(AUTH_TOKEN);
    }

    if (!storedToken) {
      snackbar("error", "Invalid Session");
      router.replace('/login');
      return;
    } else {
      //validate token
      fetch(`${BACKEND_URL}${PROTECTED_BILKENTEER}`, {
        method : "GET",
        headers : {
          "Authorization" : `Bearer ${storedToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if ("success" in data) {
          setAuthorized(true);
          snackbar("success", data["success"]);
        } else {
          throw new Error("Token Invalid");
        }
      })
      .catch(err => {
        localStorage.removeItem(AUTH_TOKEN);
        setAuthToken(null);
        snackbar("error", "Invalid Tokken");
      })
    }
  }, [authToken])

  if (!authorized) {
    return <React.Fragment />
  }

  return (
    <>
      {props.children}
    </>
  )

}