import React from 'react';
import { Card, Box, Paper, CardContent, CardMedia, Typography, Button, Grid, Chip, Container, useTheme } from '@mui/material';
import { ProductCard, TagCard, TrendingChip}  from "@/components/market";
import { DomainImage } from '@/components/shared';

export default function MarketPage(){
  // platform name -> MarketPlace and lost and found Forum
  const theme = useTheme();
  const trendingTags = React.useMemo(() => ([
    { 
      id: 1,
      name: 'Recent', 
      isSelected : true , 
  },
    { 
      id: 1,
      name: 'Rentable',  
      isSelected : false , 
  },
]), []);

  const platforms = React.useMemo(() => ([
    { 
      id: 1,
      name: 'Basys 3 Board', 
      imageUrl: '/market-img.svg',  
      isSelected : true , 
  },
    { 
      id: 2,
      name: 'Basys 3 Board', 
      imageUrl: '/forum-img.svg',  
      isSelected : false , 
  },
]), []);
    // platform name -> MarketPlace and lost and found Forum
    const tags = React.useMemo(() => ([
      { 
        id: 1,
        name: 'Text Books', 
        imageUrl: '/market-img.svg',  
        isSelected : true , 
    },
      { 
        name: ' Electronics', 
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
      name: 'Iphone 11', 
      price: 19.99, 
      imageUrl: '/product2-img.svg',
      tags: ["Electronics", "Gadgets"],  
      isFavorite : true , 
      isAdded : true 
    },
  ]), []);

  return (
    <> 
    <Container>
        <Typography variant="h4" color="primary" 
          sx={{
            width: 'fit-content',
            margin: "0 auto",
            fontSize: '2.5rem',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '1.375rem',
            paddingTop: 2,
            paddingBottom: 5,
            textAlign: 'center',
            textTransform : "uppercase",
            letterSpacing: 10
          }}
        >
          Home
        </Typography>
        {/* Platform LISTINGS */}
        <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
          {platforms.map((platform) => (
            <Grid item key={platform.id} xs={12} sm={6} md={4} lg={5} >
              <Paper sx={{height : "250px"}}>
                <DomainImage 
                  src={platform.imageUrl}
                  alt={platform.name}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/** Grid starts here till chips */}
        <Grid container >
        <Grid item sx={{ paddingTop: '16px' }}>
          <Typography noWrap variant="h5" color="primary" fontWeight="bold" gutterBottom >
            What Would You Like To Find?
          </Typography>

        </Grid>        
        {/* Tag lisitngs */}
        <Grid item sx={{ padding: '16px' }} >
        <Container>
          <Grid container spacing={2}>
            {tags.map((tag) => (
              <Grid item key={tag.id} xs={12} sm={6} md={4} lg={2}>
                <TagCard tag={tag} />
              </Grid>
            ))}
          </Grid>
        </Container>
        
        </Grid> 
        {/* Trending now */}
        <Grid item xs={12} sm={8} md={6} sx={{ paddingTop: '16px' }}>
        <Typography noWrap variant="h5" color="primary" fontWeight="bold" gutterBottom >
          Trending Now  
        </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={6} sx={{ padding: '16px' }}>
         {/* Trending Chips */}     
        </Grid>
        <Grid item xs={12} sm={8} md={6} sx={{ padding: '16px' }}>
          <Grid container spacing={2}>
            {trendingTags.map((tag) => (
              <Grid item key={tag.id} xs={12} sm={6} md={4} lg={2}>
                <TrendingChip tagChip={tag} />
              </Grid>
            ))}
          </Grid>
        </Grid>
         

        {/** Grid ends here */}
        </Grid>

        {/* PRODUCT LISTINGS */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
    </Container>
    </>
  );
}