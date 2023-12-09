import Link from "next/link";
import * as React from "react";

import {
  Box,
  Button,
  Typography,
  Chip,
  useTheme
} from "@mui/material";
import {styled} from "@mui/system";
import { ProfilePicture, ProfilePictureProps } from "./ProfilePicture";
import { TrustScore } from "./TrustScore";

import type { User } from "@/auth";

const InfoBox = styled(Box)(({theme}) => ({
  display : "flex",
  flexDirection : "column",
  alignItems : "center",
  height : "100%",
  width : 350,
  gap : 10
}))


interface InfoContainerProps extends Omit<ProfilePictureProps, "style">, User {
  pictureStyles? : React.CSSProperties;
  settings? : {
    redirect : boolean;
    url : string
  }
}

export function InfoContainer(props : InfoContainerProps) {

  const theme = useTheme();

  return (
    <InfoBox>
      <ProfilePicture 
        imgAlt={props.imgAlt}
        imgSrc={props.imgSrc}
        style={props.pictureStyles}
      />
      <Typography
        variant="h5"
        style={{
          color : theme.palette.primary.main
        }}
      >
        {props.firstName} {props.lastName}
      </Typography>
      <Chip 
        label={props.role}
        size="small"
        color="secondary"
      />
      {
        props.trustScore &&
        <TrustScore 
          score={props.trustScore}
        /> 
      }

      <Button
        variant="text"
        href={`mailto:${props.email}`}
        sx={{
          textTransform : "none"
        }}
      >
        {props.email}
      </Button>
      
      {
        props.settings && props.settings.redirect &&
        <Link
          href={props.settings.url}
        >
          <Button
          variant="outlined"
          sx={{
            textTransform : "none"
          }}
          >
            Profile Settings
          </Button>
        </Link>        
      }

    </InfoBox>
  )
}