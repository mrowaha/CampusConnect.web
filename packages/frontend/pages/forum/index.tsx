import React from "react";

import { Container, Stack } from "@mui/material"
import { Post } from "@/components/forum";
import { PageTitle } from "@/components/shared";

export default function ForumPage(){
    const PostContents = React.useMemo(() => ([
        {   
            id: 1,
            userName : "Mehshid",
            userImageUrl: '/user-avatar.svg', 
            productImageUrl: '/product2-img.svg', 
            title : "Lost Iphone Lorem ipsum dolor sit amet, consectetur adipiscing eli ullamcorper, eu fringilla quam r",
            body :   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. ' +
            'Aenean cursus euismod nisi, a dignissim urna tincidunt id. ' +
            'Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.'
          
        },
    ]), []);



    return(
        <Container> 
        {/* Page Title */}
        <PageTitle pageTitle={"Forums"} />

        <Stack direction="column" sx={{width : "70%", margin : "0 auto"}}>
        {
            PostContents.map((post) => (
                <Post post ={post} />
            ))
        }

        </Stack>
        {/* Post Listings */}
        </Container>
    );
};