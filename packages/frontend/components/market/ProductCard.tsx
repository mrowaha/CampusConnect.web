import React from 'react'; 
import {StarIcon, AddIcon} from "@/icons";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router';
import { IconChartBar, IconThumbUp } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";

import useProductPictures from "@/hooks/useProductPictures";


import { Card, 
    CardContent, 
    CardMedia,
    CardActions,
    IconButton, 
    Typography, 
    Button, 
    Divider,
    Grid, Chip,Box,
    Paper,
    CircularProgress,
    useTheme} from '@mui/material';
import { DomainImage } from '@/components/shared';
import Link from 'next/link';
    

export const ProductCard = ({ product }) => {
    const router = useRouter();
    const theme = useTheme();
    const [isFavorite, setIsFavorite] = React.useState(product.isFavorite);
    const [isAdded, setIsAdded] = React.useState(product.isAdded);

    const [imgUrls, status, fetchImages] = useProductPictures();
    React.useEffect(() => {
      fetchImages(product.id);
    }, []);


    const handleViewProduct = () => {
        router.push(`/product/${product.id}`);
        // Navigation to product details page
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
            }
          
          }
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
            sx={{ width: "95%", padding : "1rem", aspectRatio : "1/1" }}
        >
          {
              {
                "loading": <CircularProgress />,
                "success": <DomainImage src={imgUrls[0]} alt="image"  />,
                "error":  <Typography>Failed To Load Images</Typography>
              }[status]
          }
        </CardMedia>
        <CardContent>

            
        <div onClick={handleViewProduct} style={{overflow: "hidden", textOverflow: "ellipsis", width: '100%', display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 2}}>
                <Typography noWrap variant="h6" color="primary" fontWeight="bold" gutterBottom >
                    {product.name}
                </Typography>
        </div>  
   
        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Typography color={'grey'}>
                13-01-2022
            </Typography>
            
            {/* Display seller rating as stars */}
            <Box sx={{ display: 'flex' }}>
                {Array.from({ length: product.sellerRating }, (_, index) => (
                    <IconStar key={index} size={20} color= {theme.palette.primary.light} />
                ))}
            </Box>
        </Box>

        </CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {product.tags?.length > 0 && product.tags.slice(0, 5).map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" color="primary" size="small" sx={{ margin: 0.5 }} />
        ))}
        {product.tags?.length > 5 && (
            <Chip label="......." variant="outlined" color="primary" size="small" sx={{ margin: 0.5 }} />
        )}
        </Box>
        <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Link href={`/product/${product.id}`}>
              <Button variant="contained" color="primary" size="small" onClick={handleViewProduct}>
                  View Product
              </Button>
              
            </Link>
            
            <Typography color={"primary"}>
            {product.price} TL
            </Typography>

         
        </CardActions>
    </Card>
    </Paper>
    );
  };