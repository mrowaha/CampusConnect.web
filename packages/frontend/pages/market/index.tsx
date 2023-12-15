import React from 'react';
import { Card, Box, Paper, CardContent, CardMedia, Typography, Button, Grid, Chip, Container } from '@mui/material';
import { ProductCard, PlatformCard }  from "@/components/market";
import { platform } from 'os';


export default function MarketPage(){
  const Platforms = React.useMemo(() => ([
    { 
      id: 1,
      name: 'Basys 3 Board', 
      imageUrl: '/market-img.svg',  
      isSelected : false , 
  },
    { 
      name: 'Basys 3 Board', 
      imageUrl: '/forum-img.svg',  
      isSelected : false , 
  },
]), []);
  // Example data for products
  const products = React.useMemo(() => ([
    { 
      id: 1, 
      name: 'Basys 3 Board', 
      price: 19.99, 
      imageUrl: '/product1-img.svg',
      tags: ["Electronics", "Gadgets"],  
      isFavorite : true , 
      isAdded : true 
    },
    { 
      id: 2, 
      name: 'Basys 3 Board', 
      price: 19.99, 
      imageUrl: '/product2-img.svg',
      tags: ["Electronics", "Gadgets"],  
      isFavorite : true , 
      isAdded : true 
    },
  ]), []);

  return (
    <Paper> 
    <Container>
        <Typography variant="h4" sx={{
          color: '#000',
          fontFamily: 'Cairo',
          fontSize: '2.5rem',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '1.375rem',
          paddingTop: 2,
          paddingBottom: 5,
          textAlign: 'center',
        }}>
          Home
        </Typography>




        {/* PRODUCT LISTINGS */}
        <Container>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {Platforms.map((platform) => (
              <Grid item key={platform.id} xs={12} sm={6} md={4} lg={4}>
                <PlatformCard platform={platform} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
    </Container>
    </Paper>
  );
}