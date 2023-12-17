import * as React from "react";
import Caurosel from "react-material-ui-carousel";

import {
  Box,
  useTheme,
  Button,
  Typography
} from "@mui/material";
import { DomainImage } from ".";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

interface DomainImageCauroselProps {
  sources: string[]
}

export function DomainImageCaurosel(props : DomainImageCauroselProps) {

  const theme = useTheme();

  return (
    <Caurosel
      NavButton={({onClick, style, next}) => {
        return (
        // @ts-ignore
        <Button onClick={onClick} size="small"  variant="outlined" style={style} sx={{position : "absolute", bottom : 0, right: next? 0 : undefined}} 
            startIcon={next ? <SkipNextIcon style={{fill : "white"}} /> : <SkipPreviousIcon  style={{fill : "white"}} />}
        >
          <Typography variant="body2" sx={{color : "#fff"}}>{next ? "Next" : "Prev"}</Typography>
        </Button>
        )
      }}
      sx={{ aspectRatio : "1/1"}}
      navButtonsProps={{
        style: {
            backgroundColor: theme.palette.secondary.main,
        }
      }}
    >
      {
        props.sources.map((source, idx) => (
          <Box key={idx}>
            <DomainImage 
              src={source}
              alt="product image"
            />
          </Box>
        ))
      }
    </Caurosel>
  )

}
