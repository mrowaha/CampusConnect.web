import * as React from "react";

import {
  StarIcon,
} from "@/icons";
import { 
  Typography,
  useTheme
} from "@mui/material";

export function TrustScore(
  {
    score
  } :
  {
    score : 0 | 1 | 2 | 3 | 4 | 5
  }
) {

  const theme = useTheme();

  return (
    <>
      <div
        style={{
          display : "flex",
          flexDirection : "row"
        }}
      >
        <StarIcon
          filled={score >= 1}
        />
        <StarIcon
          filled={score >= 2}
        />
        <StarIcon
          filled={score >= 3}
        />
        <StarIcon
          filled={score >= 4}
        />
        <StarIcon
          filled={score >= 5}
        /> 
      </div>
      <Typography
        variant="body2"
        style={{
          color : theme.palette.secondary.main
        }}
      >
        Trust Score {score} / 5
      </Typography>
    </>
  )

}