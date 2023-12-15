import React from 'react'; 
import {StarIcon, AddIcon} from "@/icons";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router';

import { Card, 
    CardMedia,
    Typography, 
    Paper,
    Box,
    useTheme} from '@mui/material';
import { DomainImage } from '@/components/shared';
    

    export const PlatformCard = ({ platform }) => {
        const router = useRouter();
        const theme = useTheme();
        const [isSelected, setIsSelected] = React.useState(platform.isSelected);
        
        const handleIsSelected = (event : any) => {
            // Toggle the added to cart status
            setIsSelected(!isSelected);
            
          };
        
    return (
        <Paper>
        <Card sx={{position : "relative", isolation : "isolate", paddingTop: "0.75rem"}}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardMedia sx={{ height: 200 }}>
                <DomainImage
                    src={platform.imageUrl}
                    alt={platform.name}
                />
            </CardMedia>
        </Box>
        
        </Card>
        </Paper>
    );
  };