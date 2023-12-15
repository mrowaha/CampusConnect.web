import React from 'react'; 
import {StarIcon, AddIcon} from "@/icons";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router';

import { Card, 
    CardContent, 
    CardMedia,
    CardActions,
    IconButton, 
    Typography, 
    Button, 
    Grid, 
    Chip, 
    Paper,
    useTheme} from '@mui/material';
import { DomainImage } from '@/components/shared';
    

    export const ProductCard = ({ product }) => {
        const router = useRouter();
        const theme = useTheme();
        const [isFavorite, setIsFavorite] = React.useState(product.isFavorite);
        const [isAdded, setIsAdded] = React.useState(product.isAdded);
        
        
        const handleAddToCart = (event : any) => {
            // Toggle the added to cart status
            setIsAdded(!isAdded);
            
          };
        const handleAddToFavorites = (event : any) => {
          // Toggle the favorite status
          setIsFavorite(!isFavorite);
          
        };
    return (
      <Paper>
      <Card sx={{position : "relative", isolation : "isolate", paddingTop: "0.75rem"}}>
        <IconButton 
            size="small" 
            onClick={handleAddToFavorites}
            sx={{ fontSize: '1em', position : "absolute", right : 0, top : 0, zIndex: 999 }}
        >
            {isFavorite ? <FavoriteIcon style={{fill: theme.palette.primary.main}}/> : <FavoriteBorderIcon style={{fill: theme.palette.secondary.main}} />}
        </IconButton>

        <CardMedia sx={{height : 200}}>
            <DomainImage 
                src={product.imageUrl}
                alt={product.name}
            />
        </CardMedia>
        <CardContent>
            <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '100%', display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 2}}> 
                <Typography noWrap variant="h6" color="primary" fontWeight="bold" gutterBottom >
                    {product.name}segfsefgefnewiwntint
                </Typography>
            </div>  
            {/* Dynamic rendering of chips based on product tags */}
            {
                product.tags?.length > 0 && (
                    <div>
                        {
                        product.tags.map((tag, index) => (
                            <Chip label={tag} variant="outlined" color="primary" size="small" sx={{marginRight: 0.5}} />
                        ))
                        }
                    </div>
                )
            }      
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" size="small" onClick={handleAddToCart} fullWidth>
                {isAdded ? 'Add to cart' : 'Remove'}
            </Button>
            <Button variant="text" disabled size="small" sx={{ fontSize: '1em' }}>
            ${product.price}
            </Button>
        </CardActions>
    </Card>
    </Paper>
    );
  };