import * as React from "react";

import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  useTheme
} from "@mui/material";
import {styled} from "@mui/system";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

export interface BidsListProps {
  userId: string;
  bidId: string;
  bidPrice: number;
  onAccept: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
}

const BidContainer = styled(Grid)(({theme}) => ({
  width: "100%", 
  backgroundColor: theme.palette.primary.main, 
  borderRadius: 40,
  padding : "0.25rem"
}))

export function Bid(props : BidsListProps) {

  const theme = useTheme();

  return (
    <BidContainer container justifyContent="space-between" alignItems="center">
      <Grid item xs={1}>
        <Avatar 
          src="/blank-profile-picture.webp"
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1" sx={{color : "#fff"}} textAlign="center">
          Bid Price: TL {props.bidPrice}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton size="small" sx={{backgroundColor: theme.palette.secondary.light, marginRight : 1}}>
          <DoneAllIcon sx={{fill : "green"}} />
        </IconButton>
        <IconButton size="small" sx={{backgroundColor: theme.palette.secondary.light}}>
          <CancelIcon sx={{fill : "red"}} />
        </IconButton>
      </Grid>
    </BidContainer>
  )


}