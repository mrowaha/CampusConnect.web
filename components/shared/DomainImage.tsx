import Image from "next/image";
import React from "react";

import {
  Box,
  CircularProgress
} from "@mui/material";
import {styled} from "@mui/material";

interface DomainImageStyles {
  background? : string;
  border? : string;
}

export interface DomainImageProps extends DomainImageStyles {
  src : string;
  alt : string;
  progressSize? : number;
  progressThickness? : number;
}

const ImageContainer = styled('div')<DomainImageStyles>(({theme, background, border}) => ({
  display : "flex",
  justifyContent : "center",
  alignItems : "center",
  width : "100%",
  [theme.breakpoints.down("md")] : {
    // width : "80%",
  },
  [theme.breakpoints.down("sm")] : {
    // width : "80%"
  },
  background : background || "inherit",
  border : border || "inherit",
  "> div" : {
    position: "unset !important"
  }
}));

// /** @ts-ignore */
const StyledImage = styled(Image)(({theme}) => ({
  width : "100%",
  height : "100%"
}))

export function DomainImage(props : DomainImageProps) {

  const [imgLoaded, setImgLoaded]  =  React.useState<boolean>(false);

  return (
    <ImageContainer
      background={props.background}
      border={props.border}
    >
      <StyledImage
        alt={props.alt}
        src={props.src}
        width={0}
        height={0}
        sizes="100vw"
        onLoadingComplete={() => setImgLoaded(true)}
        sx={{
          opacity: imgLoaded ? 1 : 0,
          transitionDuration: "2000ms",
          transitionProperty: "opacity",
          transitionTimingFunction: "ease-out",
        }}
      />
      {!imgLoaded &&
        <CircularProgress 
          size={props.progressSize || 80}
          thickness={props.progressThickness || 3}
          color="secondary"
        />
      }
    </ImageContainer>
  )
}