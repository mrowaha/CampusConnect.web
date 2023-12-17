import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import * as React from "react";
import {useAtom} from "jotai";
import {
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { TagCard } from "@/components/market";
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { ActionButtonProps, InfoContainer as ProductInfo } from "@/components/product";
import { useCurrentUserWithValidation } from "@/auth";
import { useSnackbar } from "@/store/snackbar";
import loginRedirectAtom from "@/store/loginredirect";
const NoSSRDomainImageCaurosel = dynamic(() => import("@/components/shared/DomainImageCaurosel").then((exports) => exports.DomainImageCaurosel)
, {
  ssr : false
})

export default function ProductPage() {

  const router = useRouter();
  const theme = useTheme();
  const snackbar = useSnackbar();
  const currentUser = useCurrentUserWithValidation();
  const [_, setLoginRedirect] = useAtom(loginRedirectAtom);

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
        onClick: () => {console.log("hello")}
      },
      {
        text: "Place Bid",
        icon: <MonetizationOnIcon style={{fill: "#fff"}} />,
        onClick: handlePlaceBid
      }

    ]
    return actions;
  }, [handlePlaceBid]);

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

  return (
    <Container>
      <Stack direction="column" gap={2}>
        <Grid container gap={1}>
          <Grid item xs={5} sx={{padding : "1rem", backgroundColor: theme.palette.secondary.light}}>
            <NoSSRDomainImageCaurosel 
              sources={
                ["/blank-profile-picture.webp",
                "/blank-profile-picture.webp",
                "/blank-profile-picture.webp",
                "/blank-profile-picture.webp",
                "/blank-profile-picture.webp"]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <ProductInfo 
              name="Some Product"
              seller={{
                firstName: "Muhammad",
                lastName: "Rowaha",
                email: "hello",
                trustScore : 3,
                uuid: "hello",
                role: "BILKENTEER"
              }}
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
              obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
              nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
              quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
              sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
              recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
              minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
              quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
              fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
              consequuntur! Commodi minima excepturi repudiandae velit hic maxime
              doloremque. Quaerat provident commodi consectetur veniam similique ad 
              earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
              fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
              suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
              modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
              totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
              quasi aliquam eligendi, placeat qui corporis!"
              startingPrice={12000}
              type="renting"
              highestBidPrice={13000}
              tags={["some", "tags"]}
              actions={postActions}
              onWishlist={handleWishlist}
            />
          </Grid>
        </Grid>
        
        <Typography color="primary" variant="h5">
        Keep Exploring
        </Typography>
        <Container>
          <Grid container spacing={2}>
            {tags.map((tag) => (
              <Grid item key={tag.id} xs={12} sm={6} md={4} lg={2}>
                <TagCard tag={tag} />
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
      </Stack>
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