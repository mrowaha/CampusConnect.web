import * as React from "react";

import { useAtom } from "jotai";

import {
  Snackbar,
  Alert 
} from "@mui/material";

import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity
} from "@/store/snackbar";

interface LayoutProps {
  children : React.ReactNode
}


export default function Layout(props : LayoutProps) {

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity, __] = useAtom(snackbarSeverity);
  const [message, ___] = useAtom(snackbarMessage);

  return (
    <>
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>   
      {props.children}
    </>
  )

}