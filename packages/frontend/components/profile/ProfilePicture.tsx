import * as React from "react";

import {
  Box,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import {styled} from "@mui/system";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { DomainImage } from "../shared";

type ImageContainerStyles = {
  style : React.CSSProperties | undefined
}

const ImageContainer = styled(Box)<ImageContainerStyles>((props) => ({
  ...props.style,
  position : "relative"
}));

export interface ProfilePictureProps  {
  imgSrc : string;
  imgAlt : string;
  updatable? : boolean;
  onProfilePictureUpdate? : () => void;
  style? : React.CSSProperties;
}

export function ProfilePicture(props : ProfilePictureProps) {

  const theme = useTheme();

  return (
      <ImageContainer
        style={props.style}
      >
        <DomainImage 
          alt={props.imgAlt}
          src={props.imgSrc}
          circle={true}
        />
        {
          props.updatable && props.onProfilePictureUpdate &&
          <Tooltip
          title="Upload New Image"
          >
            <IconButton
              style={{
                position : "absolute",
                right : 0,
                bottom : 0,
                backgroundColor : theme.palette.primary.main
              }}
              size="small"
              onClick={props.onProfilePictureUpdate}
            >
              <CameraAltIcon style={{fill : "#fff"}} />
            </IconButton>
          </Tooltip>

        }
      </ImageContainer>
  )
}