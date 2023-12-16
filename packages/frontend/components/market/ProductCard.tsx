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
        const [isSelected, setIsSelected] = React.useState<boolean>(false);
        
        
        const handleViewProduct = (event : any) => {
            // implement this
            setIsSelected(!isSelected);
            
          };
        const handleAddToFavorites = (event : any) => {
          // Toggle the favorite status and imlement add to fav logics
          setIsFavorite(!isFavorite);
          
        };
    return (
      <Paper>
        <Card sx={{
            position : "relative", 
            isolation : "isolate", 
            paddingTop: "0.75rem",
            "&:hover" : {
                backgroundColor: theme.palette.secondary.light,
                cursor: "pointer"
            }
            }}
        >
        <IconButton 
            size="small" 
            onClick={handleAddToFavorites}
            sx={{ fontSize: '1em', position : "absolute", right : 2, top : 2, zIndex: 999, backgroundColor: theme.palette.secondary.light }}
        >
            {isFavorite ? <FavoriteIcon style={{fill: theme.palette.primary.main}}/> : <FavoriteBorderIcon style={{fill: theme.palette.secondary.main}} />}
        </IconButton>

        <CardMedia component="div"
            onClick={handleViewProduct} // Replace with your actual click handler
            sx={{ height: 200 }}
        >
            <DomainImage 
                src={product.imageUrl}
                alt={product.name}
            />
        </CardMedia>
        <CardContent>
            <div onClick={handleViewProduct} style={{overflow: "hidden", textOverflow: "ellipsis", width: '100%', display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 2}}> 
                <Typography noWrap variant="h6" color="primary" fontWeight="bold" gutterBottom >
                    {product.name}
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
            <Button variant="contained" color="primary" size="small" onClick={handleViewProduct} fullWidth>
                View Product
            </Button>
            <Button variant="text" disabled size="small" sx={{ fontSize: '1em' }}>
            ${product.price}
            </Button>
        </CardActions>
    </Card>
    </Paper>
    );
  };