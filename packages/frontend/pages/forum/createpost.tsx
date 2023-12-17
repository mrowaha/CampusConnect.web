import dynamic from "next/dynamic";
import React from "react";

import { Container, Grid, Stack, Button, useTheme } from "@mui/material";
import { PageTitle } from "@/components/shared";
import { CreatePost } from "@/components/forum/CreatePost";


export default function createPost() {
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

      const PostContents = {
        id: 1,
        title: "Lost Iphone Lorem ipsum dolor sit amet, consectetur adipiscing eli ullamcorper, eu fringilla quam r",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. " +
          "Aenean cursus euismod nisi, a dignissim urna tincidunt id. " +
          "Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.",
        imageUrls: postImages, // Adding the imageUrls array
      };

  return (
    <Container>
      {/* Page Title */}
      <PageTitle pageTitle={"Create Post"} />

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
       

      </Stack>
        {/* horizontal margin */}
        <div 
            style={{
            width: "100%",
            height : 20 }}  
        />
       <Grid container  sx={{ width: "70%", margin: "0 auto" }}> 
       <Grid item key={PostContents.id} xs={12}>
      <CreatePost />
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
