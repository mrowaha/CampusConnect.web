import dynamic from "next/dynamic";
import React, {useEffect} from "react";

import { Container, Grid, Stack, Button, useTheme } from "@mui/material";
import { PageTitle } from "@/components/shared";
import { useRouter } from "next/router";
import {BACKEND_URL, GET_FORUM_POST_BY_ID} from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import FullPost  from "@/components/forum/FullPost";


export default function post() {
    const [isLostSelected, setLostSelected] = React.useState<boolean>(true); // by default in lost forum
    const [isFoundSelected, setFoundSelected] = React.useState(false);
    const [isEditSelected, setEditSelected] = React.useState(false);
    const router = useRouter();
    const [forumPost, setForumPost] = React.useState(null);
    const snackbar = useSnackbar();

    useEffect(() => {
      if (router.isReady) {
        fetchForumPost(router.query.postId)
        // setForumPost(router.query.postId);
      }
    }, [router.query, router.isReady]);

    const fetchForumPost = async (postId) => {

      try {
        const res = await fetch(`${BACKEND_URL}${GET_FORUM_POST_BY_ID}${postId}`, {
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          },
        });
      
        //ForumPost Data saved and processed
        const data= await res.json();
        setForumPost(data)
  
      } catch (err: unknown) {
        snackbar("error", (err as Error).message);
      }
    } 
    
    const theme = useTheme();
    const reloadData = () => {
      fetchForumPost(router.query.postId)
    };
    
    const handleLostForum = () => {
        setFoundSelected(!isFoundSelected);
        setLostSelected(!isLostSelected);
        router.replace("/forum?forumType=LOST")
      };
    
    const handleFoundForum = () => {
      router.replace("/forum?forumType=FOUND")
      setLostSelected(!isLostSelected);
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
        {/* * Edit Button -- available only if user owns the post
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
          } */}

      </Stack>

      {/* Post Listing -- image, name, text, comment bar, usercomments */}
      {(forumPost!= null && ( <Grid container spacing={3} sx={{ width: "70%", margin: "0 auto" }}>
        <Grid item key={forumPost.forumPostId} xs={12}>
          {/* <FullPost post={PostContents} /> */}
          <FullPost post={forumPost} reloadData={reloadData}/>
        </Grid>
      </Grid>))}

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
