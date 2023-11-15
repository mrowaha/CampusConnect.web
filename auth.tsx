import { useRouter } from "next/router";

import React from "react";

import {atom, useAtom} from "jotai";

import { useSnackbar } from "./store/snackbar";

const authAtom = atom<string | null>(null);
const AUTH_TOKEN = "cc-token";

interface ProtectedRouteProps {
  children : React.ReactNode;
}

export default function ProtectedRoute(props : ProtectedRouteProps) {

  const snackbar = useSnackbar();
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  const [authToken, _] = useAtom(authAtom);
  const router = useRouter();

  React.useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN);
    if (!storedToken) {
      snackbar("error", "Invalid Session");
      router.replace('/login');
      return;
    } else {

    }
  }, [])

  if (!authorized) {
    return <React.Fragment />
  }

  return (
    <>
      {props.children}
    </>
  )

}