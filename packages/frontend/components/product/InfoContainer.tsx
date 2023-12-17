import * as React from "react";
import {useAtom} from "jotai";
import {
  Stack,
  Typography,
  Chip,
  Divider,
  useTheme,
  IconButton,
  Avatar,
  ButtonGroup,
  Button
} from "@mui/material";
import { User, currentUserAtom } from "@/auth";

import { StarIcon } from "@/icons";
import { TrustScore } from "../profile";
import { ActionButtonProps } from ".";

export interface InfoContainerActions extends ActionButtonProps {
}

export interface InfoContainerProps {
  name: string;
  type: "selling" | "renting";
  startingPrice: number;
  description: string;
  seller: User;
  tags?: string[];
  highestBidPrice?: number;
  onEdit: () => void;
  viewsCount? :number;
  wishlistCount?: number;
  bidCount?: number;
  actions?: ActionButtonProps[];
}


export function InfoContainer(props : InfoContainerProps) {

  const theme = useTheme();
  const [isFavourited, setIsFavourited] = React.useState<boolean>(false);
  const [currentUser] = useAtom(currentUserAtom);

  return (
    <Stack direction="column" gap={0.5} display="flex" position="relative" sx={{height : "100%"}}>
      <div style={{display : "flex", justifyContent : "space-between"}}>
        <Typography variant="h3">
          {props.name}
          <Chip  label={<Typography sx={{color : "white", textTransform: "uppercase"}}>{props.type}</Typography>} color="primary" sx={{marginLeft : 1}}/>
        </Typography>
        {
          currentUser && props.seller.uuid === currentUser.uuid ?
          <></>
          :
          <IconButton size="small" onClick={() => setIsFavourited(prev => !prev)} sx={{height : "fit-content", alignSelf : "center"}}>
            <StarIcon filled={isFavourited} />
          </IconButton>
        }
      </div>
      <Divider orientation="horizontal" sx={{ backgroundColor: theme.palette.primary.main }}/>
      <div style={{display : "flex", justifyContent : "space-between", alignItems : "flex-end"}}>
        <Typography variant="h4">
          TL {props.startingPrice}
        </Typography>
        <Typography variant="h6" sx={{color : "grey"}}>
          Minimum Starting Price
        </Typography>
      </div>
      {
        props.highestBidPrice &&
        <div style={{display : "flex", justifyContent : "space-between", alignItems : "flex-end"}}>
          <Typography variant="h4">
            TL {props.highestBidPrice}
          </Typography>
          <Typography variant="h6" sx={{color : "grey"}}>
            Current Highest Bid
          </Typography>
        </div>
      }
      <Divider orientation="horizontal" sx={{ backgroundColor: theme.palette.primary.main }}/>
      {
        props.tags &&
        <div>
          {React.Children.toArray(
            props.tags.map(tag => <Chip size="small" component="span" label={<Typography variant="body2" sx={{color : "white", textTransform: "uppercase"}}>{tag}</Typography>} color="secondary" sx={{marginLeft : 1, width: "fit-content"}}/>)
          )}
        </div>
      }
      <div style={{overflowY : "scroll", height: 200}}>
        <Typography variant="body1" sx={{overflowY: "clip"}}>
          {props.description}
        </Typography>
      </div>
      
      <div style={{position: "absolute", left : 0, right: 0, bottom: 0, backgroundColor: "#fff", paddingTop: "1rem"}}>
        {
          currentUser && props.seller.uuid === currentUser.uuid ?
          <></>
          : <>
          <Typography color="primary" variant="h6">Seller</Typography>
          <div style={{display : "flex", alignItems : "center", gap: 5}} >
            <Avatar 
              src="/blank-profile-picture.webp"
            />
            <Typography variant="body1" component="span" color="primary">{props.seller.firstName} {props.seller.lastName}</Typography>
          </div>
          {
            props.seller &&
              <TrustScore 
              score={props.seller.trustScore as  0 | 1 | 2 | 3 | 4 | 5}
            />
          }
          </>      
        }
        <ButtonGroup size="small" sx={{width: "100%"}} variant="contained" color="primary">
          {
            React.Children.toArray(
              props.actions?.map((action) => (
                <Button onClick={action.onClick} startIcon={action.icon} fullWidth>
                  {action.text}
                </Button>
              ))
            )
          }
        </ButtonGroup>
      </div>
    </Stack>
  )
}