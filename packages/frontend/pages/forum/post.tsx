import dynamic from "next/dynamic";
import React from "react";

import { Container, Grid, Stack, Button, useTheme } from "@mui/material";
import { PageTitle } from "@/components/shared";

const NoSSRFullPost = dynamic(() => import("@/components/forum/FullPost"), 
{ssr: false});


export default function post() {
    const [isLostSelected, setLostSelected] = React.useState<boolean>(true); // by default in lost forum
    const [isFoundSelected, setFoundSelected] = React.useState(false);
    const [isEditSelected, setEditSelected] = React.useState(false);
    
    const theme = useTheme();
    const handleEditPost = () => {
      setEditSelected(!isEditSelected);
        
      };
    
    const handleLostForum = () => {
        setFoundSelected(!isFoundSelected);
        setLostSelected(!isLostSelected);
      };
    
      const handleFoundForum = () => {
        setFoundSelected(!isFoundSelected);
        setLostSelected(!isLostSelected);
      };
    
      const postImages = [
        "/product1-img.svg",
        "/product2-img.svg", 
        "/product1-img.svg",
        "/user2-avatar.svg",
      
      ];
      
      const commentsArray = [
        {
          name: 'John Doe',
          imageUrl: "/user-avatar.svg",
          commentText: 'This is the first comment. Lorem ipsum dolor sit amet.',
        },
        {
          name: 'Jane Smith',
          imageUrl: "/user2-avatar.svg",
          commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. " +
          "Aenean cursus euismod nisi, a dignissim urna tincidunt id. " +
          "Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.",
      
        },
        {
          name: 'Alice Johnson',
          imageUrl: "/user-avatar.svg",
          commentText: 'I love the content you share. Amazing!',
        },
      ];
      
      const PostContents = {
        id: 1,
        ownPost: true, // will enable to edit post only if user owns post
        userName: "Abbey",
        userImageUrl: "/user-avatar.svg",
        productImageUrl: "/product2-img.svg",
        totalComments: 3, // never used 
        title: "Lost Iphone Lorem ipsum dolor sit amet, consectetur adipiscing eli ullamcorper, eu fringilla quam r",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. " +
          "Aenean cursus euismod nisi, a dignissim urna tincidunt id. " +
          "Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.",
        comments: commentsArray,
        imageUrls: postImages, // Adding the imageUrls array
      };

  return (
    <Container>
      {/* Page Title */}
      <PageTitle pageTitle={"Forum Post"} />

      {/* Forum Buttons and Edit Post Button */}
      <Stack direction="row" alignItems="center" justifyContent = "center" marginLeft={2}>
        <Stack direction="row" spacing={2}>
          {/** Lost Button */}
          <Button
            size="medium"
            variant="outlined"
            onClick={handleLostForum}
            sx={{
              backgroundColor: isLostSelected ? theme.palette.primary.main : 'transparent',
              color: isLostSelected ? '#ffffff' : theme.palette.primary.main,
            }}
          >
            Lost
          </Button>
          {/** Found Button */}
          <Button
            size="medium"
            variant="outlined"
            onClick={handleFoundForum}
            sx={{
              backgroundColor: isFoundSelected ? theme.palette.primary.main : 'transparent',
              color: isFoundSelected ? '#ffffff' : theme.palette.primary.main,
            }}
          >
            Found
          </Button>
        </Stack>
        {/** Edit Button -- available only if user owns the post*/}
          {PostContents.ownPost && 
            <Stack direction="row"   marginLeft={60}>  
            <Button
              size="medium"
              variant="outlined"
              onClick={handleEditPost}
              sx={{
                backgroundColor: isEditSelected ? theme.palette.primary.main : 'transparent',
                color: isEditSelected ? '#ffffff' : theme.palette.primary.main,
              }}
            >
              Edit Post
            </Button>
            </Stack> 
          }

      </Stack>

      {/* Post Listing -- image, name, text, comment bar, usercomments */}
      <Grid container spacing={3} sx={{ width: "70%", margin: "0 auto" }}>
        <Grid item key={PostContents.id} xs={12}>
          {/* <FullPost post={PostContents} /> */}
          <NoSSRFullPost post={PostContents} />
        </Grid>
      </Grid>

      {/* horizontal margin */}
      <div 
        style={{
          width: "100%",
          height : 100
        }}
      />
    </Container>
  );
}
