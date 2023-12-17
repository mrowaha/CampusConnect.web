import React from 'react';
import {
  FormControl,
  Container,
} from "@mui/material";
import TabButtons from '@/components/profile/ProfileTabs';
import { PageTitle } from '@/components/shared';
import { Post } from "@/components/forum";

import {
  Button,
  Grid,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';

export default function forumposts() {
  const theme = useTheme();

  const [isLostSelected, setLostSelected] = React.useState(true); // by default in lost forum
  const [isFoundSelected, setFoundSelected] = React.useState(false);

  const handleLostForum = () => {
    setFoundSelected(!isFoundSelected);
    setLostSelected(!isLostSelected);
  };

  const handleFoundForum = () => {
    setFoundSelected(!isFoundSelected);
    setLostSelected(!isLostSelected);
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
      <div>
        <TabButtons />
        <PageTitle pageTitle={"Products"} />
        {/* Forum Buttons and Add Post Button */}
        <Grid container alignItems="center">
          <Grid item xs={1}>
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
          </Grid>
          <Grid item xs={9} justifyContent="flex-start">
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
            
          </Grid>
        </Grid>
      </div>

      {/* horizontal margin */}
      <div
        style={{
          width: "100%",
          height: 100
        }}
      />

      {/* Post Listings */}
      <Grid container spacing={3} sx={{ width: "70%", margin: "0 auto" }}>
        {PostContents.map((post) => (
          <Grid item key={post.id} xs={12}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>

      {/* horizontal margin */}
      <div
        style={{
          width: "100%",
          height: 100
        }}
      />
    </Container>
  );
};
