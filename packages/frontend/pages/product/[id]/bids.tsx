import {useRouter} from "next/router";
import * as React from "react";
import dynamic from "next/dynamic";
import {useAtom} from "jotai";

import {
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { ActionButtonProps, InfoContainer as ProductInfo } from "@/components/product";
import { currentUserAtom } from "@/auth";
import { Bid, BidsListProps } from "@/components/product";

export default function ProductOwnerPage() {

  const [currentUser] = useAtom(currentUserAtom);

  const router = useRouter();
  console.log(router);
  const {id} = router.query;
  const theme = useTheme();

  const handleEditPost = React.useCallback(() => {
    router.push(`/product/post?edit=true&product=${id}`)    
  }, [id]);

  const postActions = React.useMemo(() => {
    const actions : ActionButtonProps[] = [
      {
        text: "Manage Post",
        onClick: handleEditPost,
        icon: <EditIcon style={{fill : "#fff"}} />
      }
    ]
    return actions;
  }, []);

  const bids : BidsListProps[] = React.useMemo(() => (
    [
      {
        userId: "1",
        bidId: "1",
        bidPrice: 20,
        onAccept: () => {console.log("hello")},
        onCancel: () => console.log("hello")
      },
      {
        userId: "1",
        bidId: "1",
        bidPrice: 20,
        onAccept: () => {console.log("hello")},
        onCancel: () => console.log("hello")
      },
      {
        userId: "1",
        bidId: "1",
        bidPrice: 20,
        onAccept: () => {console.log("hello")},
        onCancel: () => console.log("hello")
      },
      {
        userId: "1",
        bidId: "1",
        bidPrice: 20,
        onAccept: () => {console.log("hello")},
        onCancel: () => console.log("hello")
      },
      {
        userId: "1",
        bidId: "1",
        bidPrice: 20,
        onAccept: () => {console.log("hello")},
        onCancel: () => console.log("hello")
      }
    ]
  ), []);
  
  return (
    <Container>
      <Stack direction="column" gap={2}>
        <Grid container gap={1}>
        <Grid item xs={5} sx={{padding : "1rem", backgroundColor: theme.palette.secondary.light}}>
            
          </Grid>
          <Grid item xs={6}>
            <ProductInfo 
              name="Some Product"
              seller={currentUser!}
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
            />
          </Grid>
        </Grid>

        <Typography color="primary" variant="h5">
        Current Bids
        </Typography>
        
        {
          bids.map(bid => (
            <Bid {...bid} />
          ))
        }
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

// export async function getStaticPaths() {

//   return {
//     paths: [], /* no static generation for routes */
//     fallback : true
//   }
// }

export async function getServerSideProps() {
  return {
    props : {
      protected : true
    }
  }
}