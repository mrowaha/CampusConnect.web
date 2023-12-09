import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  Grid,
  useTheme,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";

import {FilledInputField, DomainImage} from "@/components/shared";
//import { BACKEND_URL, USER_SETTINGS } from "@/routes"; // chnaged this in routes
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";

const SettingsStack =styled(Stack)(({theme}) => ({
    width : "fit-content",
    position : "absolute",
    transform : "translate(-50%, -50%)",
    padding : "1rem",
    borderRadius : "5px",
    
  }))

export default function SettingsPage(){
    const router = useRouter();
    const theme = useTheme();

    // initialise them with current user data
    const [name, setName] = React.useState<string>("");
    const [phoneNo, setPhoneNo] = React.useState<number>(0);
    const [password, setPassword] = React.useState<string>("");
    const [editProfile, setEditting] = React.useState<boolean>(false);
   
    // Event handlers
    const handleEditButtonClick = () => {
        setEditting(true);
    };
    const handleSaveButtonClick = () => {
        // Handle saving the edited data (e.g., update it in the database)
        // For simplicity, we'll just toggle the editing state in this example
        setEditting(false);
    };
    const handleCancelEditButtonClick = () => {
        // Handle canceling the edit (e.g., revert to original data).... do it
        setEditting(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    return (

    
    <div>
      {editProfile ? (
        <>
        <TextField
          label="Edit Data"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <Button onClick={handleSaveButtonClick}>Save</Button>
        <Button onClick={handleCancelEditButtonClick}>Cancel</Button>
        </>
        
      ) : (
        <>
        <Typography variant="body1">{name}</Typography>
        <Button onClick={handleEditButtonClick}>Edit</Button>

        </>
      )}
    </div>
  )
 


}