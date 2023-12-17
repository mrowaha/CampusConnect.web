import React, {useState, useEffect} from 'react';
import { Paper, Typography, Button, Grid, Box, Container, useTheme } from '@mui/material';
import { ProductCard, TagCard, TrendingChip}  from "@/components/market";
import { DomainImage } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { PlatformCard } from '@/components/market/PlatformCard';
import { useRouter } from 'next/router';
import { BACKEND_URL, SEARCH_PRODUCT } from "@/routes";
import { useAtom } from "jotai";
import {currentUserAtom} from "@/auth";


export default function MarketPage(){
  // platform name -> MarketPlace and lost and found Forum
  const theme = useTheme();

  const [productList, setProductList] = useState([])

  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useAtom(currentUserAtom);

  const [currTrendingTag, setCurrTrendingTag] = React.useState(0);


  // const handleTrendingTagSwitch = (index : number) => {
  //   setCurrTrendingTag(index);
  // }

  const displayRecent = (index) => {
    fetchData({sortBy: "LATEST"})
    setCurrTrendingTag(index);
  };

  const displayTrending = (index) => {
    fetchData({sortBy: "TRENDING"})
    setCurrTrendingTag(index);
  };

  const displayDonations = (index) => {
    fetchData({tags:["Donations"]})
    setCurrTrendingTag(index);
  };

  const displayPurchase = (index) => {
    fetchData({tags:["Purchase"]})
    setCurrTrendingTag(index);
  };

  const displayRentable = (index) => {
    fetchData({tags:["Rentable"]})
    setCurrTrendingTag(index);
  };

  const displayBorrowable = (index) => {
    fetchData({tags:["Borrowable"]})
    setCurrTrendingTag(index);
  };

  const trendingTags = React.useMemo(() => (
    [
      { label: "Recent", onClick: displayRecent },
      { label: "Trending", onClick: displayTrending },
      { label: "Donations", onClick: displayDonations },
      { label: "Purchase", onClick: displayPurchase },
      { label: "Rentable", onClick: displayRentable },
      { label: "Borrowable", onClick: displayBorrowable },
    ]), []);

    React.useEffect(() => {
      displayRecent(0)
    }, [])

  const platforms = React.useMemo(() => ([
    { 
      name: 'Market Place', 
      imageUrl: '/market-img.svg',  
      link: '/search',
    },
    { 
      name: 'Lost & Found Forum', 
      imageUrl: '/forum-img.svg',  
      link: '/forum',
    },
  ]), []);

    // platform name -> MarketPlace and lost and found Forum
    const tags = React.useMemo(() => ([
      { 
        id: 1,
        name: 'Kitchenware',
        imageUrl: '/kitchenware.png',
        isSelected : true , 
        link : '/search?tags=Kitchenware' ,
      },
      { 
        name: ' Electronics', 
        imageUrl: '/forum-img.svg',  
        isSelected : false , 
        link : '/search?tags=Electronics' ,
      },
      {
      id: 1,
      name: 'TextBooks',
      imageUrl: '/textbook.png',
      isSelected : true ,
      link : '/search?tags=TextBooks' ,
      },
      {
        id: 1,
      name: 'Instruments',
      imageUrl: '/instruments.png',
      isSelected : false ,
      link : '/search?tags=Instruments' ,
      },{
      id: 1,
      name: 'Games',
      imageUrl: '/games.png',
      isSelected : true ,
      link : '/search?tags=Games' ,
      },
      {
        id: 1,
      name: 'Furniture',
      imageUrl: '/furniture.png',
      isSelected : false ,
      link : '/search?tags=Furniture' ,
      }
    ]), []);

    const mapDataToProducts = (data, loggedInUserId) => {
      return data.map(item => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        imageUrl: '/product1-img.svg', // Replace with actual image path or logic
        tags: item.tags,
        viewCount: item.viewCount,
        sellerRating: item.seller.trustScore,
        isFavorite: item.wishListedBy.some(wishlistItem => wishlistItem.userId === loggedInUserId),
        isAdded: true, // Adjust this based on your logic
      }));
    };


    const fetchData = async (body) => {
      try {

        const response = await fetch(`${BACKEND_URL}${SEARCH_PRODUCT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const products = mapDataToProducts(data, loggedInUser? loggedInUser.uuid : "0");

        console.log("products", products)
        setProductList(products);

        // snackbar("success", "Search Completed Successfully");
      } catch (err) {
        // snackbar("error", err.message || 'An error occurred');
      }
    };

  return (
    <> 
    <Container>
      <PageTitle pageTitle = "Home" />
      {/* Platform LISTINGS */}
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
      {platforms.map((platform) => (
              <Grid item key={platform.name} xs={12} sm={6} md={4} lg={5}>
                <PlatformCard platform ={platform}/>
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
            <Paper
              elevation={0} // Normal state elevation
              sx={{
                ':hover': {
                  elevation: 5, // Elevation on hover
                  cursor: 'pointer', // Change cursor to indicate clickability
                  transform: 'translateY(-9px)', // Optional: Slight rise effect on hover
                  transition: 'transform 0.3s ease-in-out' // Smooth transition for the rise effect
                }
              }}
              onClick={() => router.replace(tag.link)}
            >
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                alt="campus connect logo"
                src={tag.imageUrl}
              />
            </Paper>
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
        <Grid item xs={12}  sx={{ padding: '16px' }}>
          <Grid container spacing={1}>
            {trendingTags.map((tag, index) => (
              // <Grid item key={index} xs={2} sm={2} md={1} lg={2}>
              <Box sx={{margin:"5px"}}>
                <TrendingChip 
                  index={index}
                  tagChip={tag.label}
                  isSelected={currTrendingTag === index}
                  onSelect={tag.onClick}
                />
              </Box>
              // </Grid>
            ))}
          </Grid>
        </Grid>

        </Grid>

        {/* PRODUCT LISTINGS */}

        <Grid item xs={8.5} style={{
                height: "75vh",
                overflowY: "auto",
                }}>


                {/* Product list Grid */}
                {productList.length > 0 ? (
                    <Grid container spacing={3}>
                    {productList.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ mb: 2 }}>
                        <ProductCard product={product} />
                        </Grid>
                    ))}
                    </Grid>
                ) : (
                    <Box sx={{ pt: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
                    <Typography variant="h6" color="text.secondary">
                        No products found
                    </Typography>
                    {/* <Skeleton height={"20%"}/>
                                        <Skeleton width="60%" /> */}
                    </Box>

                )}
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