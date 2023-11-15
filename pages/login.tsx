import * as React from "react";

import {
  Stack, 
  useTheme,
  Button,
  ButtonGroup,
  Typography
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";

import {FilledInputField, DomainImage} from "@/components/shared";

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

  const theme = useTheme();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");

  const snackbar = useSnackbar();

  React.useEffect(() => {
    // snackbar("success", "Welcome to Campus Connect");
  }, [])

  return (
    <LoginStack
      gap={2}
    >
      <DomainImage 
        src="/app-logo.png"
        alt="campus connect logo"
      />
      <FilledInputField
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
        size="small"
        fullWidth
        variant="contained"
      >
        <Button
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

      <Typography variant="h6" color="primary">
        Do you not have an account yet?
      </Typography>
      <Button 
        size="small"
        variant="outlined"
        sx={{
          textTransform : "none",
          width : "fit-content"
        }}
      >
        Create Bilkenteer Account 
      </Button>
    </LoginStack>      
  )
}