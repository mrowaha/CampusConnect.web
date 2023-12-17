import React from "react";

import {
  TextField,
  TextFieldProps
} from "@mui/material";
import { styled } from "@mui/system";

interface FilledInputFieldStyles {
  background? : string;
  hoverbackground? : string;
  focusedbackground? : string;
}

export interface FilledInputFieldProps extends Omit<TextFieldProps, 'variant'>, FilledInputFieldStyles {
  value : string;
  onChange : (e :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
}


const FilledTextField = styled(TextField)<FilledInputFieldStyles>((props) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: props.background || "#fff"
  },
  "& .MuiFilledInput-root:hover": {
    backgroundColor: props.hoverbackground || "#fff",
    "@media (hover: none)": {
      backgroundColor: props.background || "#fff"
    }
  },
  "& .MuiFilledInput-root.Mui-focused": {
    backgroundColor: props.focusedbackground || "#fff"
  },
  width : "100%",
}))


export function FilledInputField(props : FilledInputFieldProps) {

  return (
    <FilledTextField
      error={props.error || false}
      required={props.required || false}
      placeholder={props.placeholder}
      label={props.label}
      fullWidth={props.fullWidth}
      value={props.value}
      onChange={props.onChange}
      multiline={props.multiline}
      rows={props.rows}
      size={props.size}
      type={props.type}
      variant="filled"
      background={props.background}
      hoverbackground={props.hoverbackground}
      focusedbackground={props.focusedbackground}
    />
  )  
}