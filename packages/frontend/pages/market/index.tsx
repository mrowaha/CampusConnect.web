import React from 'react';
import { Paper, Typography, Button, Grid, Chip, Container, useTheme } from '@mui/material';
import { ProductCard, TagCard, TrendingChip}  from "@/components/market";
import { DomainImage } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { PlatformCard } from '@/components/market/PlatformCard';

export default function MarketPage(){
  // platform name -> MarketPlace and lost and found Forum
  const theme = useTheme();
  
  const [currTrendingTag, setCurrTrendingTag] = React.useState(0);

  React.useEffect(() => {
    setCurrTrendingTag(0);
  }, [])

  const trendingTags = React.useMemo(() => (
    ["Recent", "Rentable"]), []);

  const handleTrendingTagSwitch = (index : number) => {
    setCurrTrendingTag(index);
  }


  const platforms = React.useMemo(() => ([
    { 
      name: 'Market Place', 
      imageUrl: '/market-img.svg',  
    },
    { 
      name: 'Lost & Found Forum', 
      imageUrl: '/forum-img.svg',  
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
      <PageTitle pageTitle = "Home" />
      {/* Platform LISTINGS */}
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
      {platforms.map((platform) => (
              <Grid item key={platform.name} xs={12} sm={6} md={4} lg={5}>
                <PlatformCard platform ={platform} />
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
            {trendingTags.map((tagname, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                <TrendingChip 
                  index={index}
                  tagChip={tagname}
                  isSelected={currTrendingTag === index}
                  onSelect={handleTrendingTagSwitch} 
                />
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

        {/* horizontal margin */}
        <div 
          style={{
            width: "100%",
            height : 100
          }}
        />
    </Container>
    </>
  );
}