import * as React from "react";

import {
  Box,
  Typography,
  ButtonGroup, 
  useTheme,
  Button
} from "@mui/material";

export interface ActionButtonProps {
  text: string;
  onClick: (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  icon?: React.ReactNode;
};

export interface PostActionsBarProps {
  title : string;
  actions?: ActionButtonProps[] 
};


export function PostActionsBar(props : PostActionsBarProps) {

  const theme = useTheme();

  return (
    <Box
      sx={{
        width : "100%",
        backgroundColor: theme.palette.primary.main,
        display : 'flex',
        justifyContent : "space-between",
        padding: "0.5rem 1rem"
      }}
    >
      <Typography
        variant="h5"
        style={{color : "#fff"}}
      >
        {props.title}
      </Typography>
      {
        props.actions &&
        <ButtonGroup
          size="small"
          variant="outlined"
        >
          {
            React.Children.toArray(
              props.actions.map((buttonProps) => {
                return (
                  <Button
                    sx={{color : "#fff", borderColor : "#fff"}}
                    startIcon={buttonProps.icon}  
                    onClick={buttonProps.onClick}
                  >
                    {buttonProps.text}
                  </Button>
                )
              })
            )
          }
        </ButtonGroup>
      }
    </Box>
  )
}