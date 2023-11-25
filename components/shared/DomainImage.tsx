import Image from "next/image";
import React from "react";

import {
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

// /** @ts-ignore */
const StyledImage = styled(Image)(() => ({
  width : "100%",
  height : "100%"
}))

export function DomainImage(props : DomainImageProps) {

  const [imgLoaded, setImgLoaded]  =  React.useState<boolean>(false);

  return (
    <>
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
    </>
  )
}