import * as React from "react";

import {
  Box,
} from "@mui/material";
import {styled} from "@mui/system";
import { DomainImage } from "../shared";

type ImageContainerStyles = {
  style : React.CSSProperties | undefined
}

const ImageContainer = styled(Box)<ImageContainerStyles>((props) => ({
  ...props.style,
}));

export interface ProfilePictureProps  {
  imgSrc : string;
  imgAlt : string;
  style? : React.CSSProperties
}

export function ProfilePicture(props : ProfilePictureProps) {

  return (
      <ImageContainer
        style={props.style}
      >
        <DomainImage 
          alt={props.imgAlt}
          src={props.imgSrc}
          circle={true}
        />
      </ImageContainer>
  )
}