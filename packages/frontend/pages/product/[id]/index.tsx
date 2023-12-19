import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import * as React from "react";
import {useAtom} from "jotai";
import {
  Container,
  Grid,
  Stack,
  Typography,
  useTheme, Paper, Box, CircularProgress
} from "@mui/material";
import { TagCard } from "@/components/market";
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { ActionButtonProps, InfoContainer as ProductInfo } from "@/components/product";
import { useCurrentUserWithValidation } from "@/auth";
import { useSnackbar } from "@/store/snackbar";
import loginRedirectAtom from "@/store/loginredirect";
import useProductPictures from "@/hooks/useProductPictures";
import { ImageSlider } from "@/components/forum";
import { BACKEND_URL, GET_PRODUCT_BY_ID } from "@/routes";

export default function ProductPage() {

  console.log("hell")
  const router = useRouter();
  const theme = useTheme();
  const snackbar = useSnackbar();
  const currentUser = useCurrentUserWithValidation();
  const [imgUrls, status, fetchImages] = useProductPictures();
  const [_, setLoginRedirect] = useAtom(loginRedirectAtom);
  const [product, setProduct] = React.useState(null);

  const handlePlaceBid = React.useCallback(() => {
    if (currentUser) {
      
    } else {
      snackbar("warning", "Login Required");
      setLoginRedirect(router.asPath);
      router.push("/login");
    }
  }, [currentUser]);

  const handleWishlist = React.useCallback((state : boolean) => {
    if (currentUser) {

    } else {
      snackbar("warning", "Login Required");
      setLoginRedirect(router.asPath);
      router.push("/login");
    }
  }, [currentUser]);

  const postActions = React.useMemo(() => {
    const actions : ActionButtonProps[] = [
      {
        text: "Contact Seller",
        icon: <MessageIcon style={{fill: "#fff"}} />,
        onClick: () => {router.replace(`/inbox?uuid=${product.seller.userId}&name=${product.seller.firstName} ${product.seller.lastName}`)}
      },
      {
        text: "Place Bid",
        icon: <MonetizationOnIcon style={{fill: "#fff"}} />,
        onClick: handlePlaceBid
      }

    ]
    return actions;
  }, [handlePlaceBid, product]);

  const tags = React.useMemo(() => ([
    { 
      name: 'Kitchenware', 
      imageUrl: '/kitchenware.png',  
      isSelected : true , 
      link : '/search?tags=Kitchenware' , 
    },
    { 
      name: 'Electronics', 
      imageUrl: '/electronics.png',  
      isSelected : false , 
      link : '/search?tags=Electronics' , 
    },
    { 
    name: 'TextBooks', 
    imageUrl: '/textbook.png',  
    isSelected : true , 
    link : '/search?tags=TextBooks' , 
    },
    { 
    name: 'Instruments', 
    imageUrl: '/instruments.png',  
    isSelected : false , 
    link : '/search?tags=Instruments' , 
    },
    { 
    name: 'Games', 
    imageUrl: '/games.png',  
    isSelected : true ,  
    link : '/search?tags=Games' , 
    },
    { 
    name: 'Furniture', 
    imageUrl: '/furniture.png',  
    isSelected : false , 
    link : '/search?tags=Furniture' , 
    }
  ]), []);

  const fetchProduct = async (productId) => {
    try {

      const response = await fetch(`${BACKEND_URL}${GET_PRODUCT_BY_ID}${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log("products", products)
      setProduct(data);

      snackbar("success", "Search Completed Successfully");
    } catch (err) {
      snackbar("error", err.message || 'An error occurred');
    }
  };


  React.useEffect(() => {
    const productId = router.asPath.split("/").at(-1);
    fetchProduct(productId);
    fetchImages(productId as string);
  }, []);

  return (
    <Container>
      {(product != null && (<Stack direction="column" gap={2}>
        <Grid container gap={1}>
          <Grid item xs={5} sx={{padding : "1rem", backgroundColor: theme.palette.secondary.light}}>
            {
              {
                "loading": <CircularProgress />,
                "success": <ImageSlider images={imgUrls} />,
                "error":  <Typography>Failed To Load Images</Typography>
              }[status]
            }
          </Grid>
          <Grid item xs={6}>
            <ProductInfo 
              name={product.name}
              seller={{
                firstName: product.seller.firstName,
                lastName: product.seller.lastName,
                email: product.seller.email,
                trustScore : product.seller.trustScore,
                uuid: product.seller.userId,
                role: "BILKENTEER"
              }}
              description={product.description}
              startingPrice={product.price}
              type={product.type}
              highestBidPrice={product.highestBid ==0 ? null: product.highestBid}
              tags={product.tags}
              actions={postActions}
              onWishlist={handleWishlist}
            />
          </Grid>
        </Grid>
        
        <Typography style={{margin:"10px"}} color="primary" variant="h5">
        Keep Exploring
        </Typography>
        <Container>
        <Grid container spacing={2}>
            {tags.map((tag) => (
              <Grid item key={tag.name} xs={12} sm={6} md={4} lg={2}>
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
        <div 
          style={{
            width: "100%",
            height: 50
          }}
        />
      </Stack>))}
    </Container>
  )
}

export async function getStaticPaths() {

  return {
    paths: [], /* no static generation for routes */
    fallback : true
  }
}

export async function getStaticProps() {
  return {
    props : {
      protected : false
    }
  }
}