import React from 'react'; 
import { useRouter } from 'next/router';

import { Card, 
    CardMedia,
    Typography, 
    Paper,
    Box,
    useTheme,
    CardContent} from '@mui/material';
import { DomainImage } from '@/components/shared';
    

export const TagCard = ({  tag }) => {
    const router = useRouter();
    const theme = useTheme();
    const [isSelected, setIsSelected] = React.useState(tag.isSelected);
    
    const handleIsSelected = (event : any) => {
        // Toggle the added to cart status
        setIsSelected(!isSelected);
        
        };
    
return (
    <Paper variant='outlined' sx={{border: `1px solid ${theme.palette.primary.main}`}}>
    <Card sx={{
        position : "relative", 
        isolation : "isolate", 
        paddingTop: "0.90rem", 
        width: "100%", 
        aspectRatio : "1/1", 
        backgroundColor: theme.palette.secondary.light,
        "&:hover" : {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        }
        }}
    >
        <CardMedia sx={{height : "50%"}}>
            <DomainImage
                src={tag.imageUrl}
                alt={tag.name}
                
            />
        </CardMedia>
        <CardContent sx={{ height: "10%" }}>
        <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '100%', display: "flex", justifyContent: "center", alignItems: "baseline", gap: 2}}> 
            <Typography noWrap variant="body2" color="primary"  gutterBottom >
                {tag.name}
            </Typography>
        </div>  
            
        </CardContent>
    </Card>
    </Paper>
);
};