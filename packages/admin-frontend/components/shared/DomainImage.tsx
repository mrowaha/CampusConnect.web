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
  circle? : boolean;
}

// /** @ts-ignore */
const StyledImage = styled(Image)<{circle? : boolean}>((props) => ({
  width : "100%",
  height : "100%",
  borderRadius : props.circle ? "50%" : "none"
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
        circle={props.circle}
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