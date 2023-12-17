import React, {useEffect} from "react";

import { Container, Grid, Stack, Button, IconButton, Typography, styled, useTheme } from "@mui/material";
import { AddCircleOutlineOutlined as AddCircleOutlineIcon } from "@mui/icons-material";
import { Post } from "@/components/forum";
import { PageTitle } from "@/components/shared";
import { AddIcon } from "@/icons";
import { TrendingChip } from "@/components/market";
import { useRouter } from 'next/router';
import { BACKEND_URL, FOUND_FORUM_SEARCH, LOST_FORUM_SEARCH } from "@/routes";
import { useSnackbar } from '@/store/snackbar';


export default function ForumPage() {
    const [isLostSelected, setLostSelected] = React.useState<boolean>(true); // by default in lost forum
    const [isFoundSelected, setFoundSelected] = React.useState(false);
    const [isCreateSelected, setCreateSelected] = React.useState(false);
    const [forumType, setForumType] = React.useState(null);
    const [keywords, setKeywords] = React.useState('');
    const router = useRouter();
    const [forumPosts, setForumPosts] = React.useState([]);

    const snackbar = useSnackbar();
    // const { forumType, keywords } = router.query; // Get params from URL

    useEffect(() => {
      if (forumType != null) {
        getForumPosts();
      }
    }, [forumType, keywords]);

    useEffect(() => {
      if (router.isReady) {

        setForumType(router.query.forumType || 'LOST');
        setKeywords(router.query.keywords || '');

      }
    }, [router.isReady, router.query]);

    const getForumPosts = async () => {

      const endpoint = forumType === 'LOST' ? `${BACKEND_URL}${LOST_FORUM_SEARCH}${keywords}`: `${BACKEND_URL}${FOUND_FORUM_SEARCH}${keywords}`

      try {
        const res = await fetch(endpoint, {
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          },
        });

        //Message Thread Data saved and processed
        const data= await res.json();
        setForumPosts(data)
        console.log(data)

        snackbar("success", "Forum Posts Loaded");

      } catch (err: unknown) {
        snackbar("error", (err as Error).message);
      }
    }

    const theme = useTheme();
    const handleCreatePost = () => {
        setCreateSelected(!isCreateSelected);
        router.push("/forum/createpost")

      };
    handleCreatePost
    const handleLostForum = () => {
        setFoundSelected(!isFoundSelected);
        setLostSelected(!isLostSelected);
        setForumType("LOST");
      };
    
      const handleFoundForum = () => {
        setFoundSelected(!isFoundSelected);
        setLostSelected(!isLostSelected);
        setForumType("FOUND");
      };
    

  const PostContents = React.useMemo(() => [
    {
      id: 1,
      userName: "Abbey",
      userImageUrl: "/user-avatar.svg",
      productImageUrl: "/product2-img.svg",
      totalComments : 3 , // never used
      title: "Lost Iphone Lorem ipsum dolor sit amet, consectetur adipiscing eli ullamcorper, eu fringilla quam r",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. " +
        "Aenean cursus euismod nisi, a dignissim urna tincidunt id. " +
        "Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.",
    },
    {
      id: 2,
      userName: "Sara",
      userImageUrl: "/user2-avatar.svg",
      productImageUrl: "/product2-img.svg",
      totalComments : 5 ,
      title: "Lost Iphone Lorem ipsum dolor sit amet, consectetur adipiscing eli ullamcorper, eu fringilla quam r",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Pellentesque vestibulum ligula in risus ullamcorper, eu fringilla quam rhoncus. " +
        "Aenean cursus euismod nisi, a dignissim urna tincidunt id. " +
        "Fusce scelerisque justo non nunc laoreet, nec finibus nulla euismod.",
    },
  ], []);

  return (
    <Container>
    {/* Page Title */}
    <PageTitle pageTitle={"Forums"} />



    {/* Forum Buttons and Add Post Button */}
    <Stack direction="row" alignItems="center" justifyContent = "center" marginLeft={2}>
      <Stack direction="row" spacing={2}>
        
      
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

        <Stack direction="row"   marginLeft={60}>  
        <Button
        size="medium"
        variant="outlined"
        onClick={handleCreatePost}
        sx={{
          backgroundColor: isCreateSelected ? theme.palette.primary.main : 'transparent',
          color: isCreateSelected ? '#ffffff' : theme.palette.primary.main,
        }}
      >
        Create Post
      </Button>
        </Stack>
    </Stack>

    {/* Post Listings */}
   {( forumPosts.length > 0 && (<Grid container spacing={3} sx={{ width: "70%", margin: "0 auto" }}>
        {forumPosts.map((post) => (
          <Grid item key={post.id} xs={12}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>))}
  </Container>
  );
}
