import React from "react" ;
import { DomainImage } from '../shared';
import { Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import {  CommentBar, ImageSlider } from ".";
import {styled} from "@mui/system";
import { UserComment } from "./UserComment";

const PostStack = styled(Stack)(({theme}) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    backgroundColor: 'white',
    padding: "1rem"
}))

const FullPost = ({post}) => {
    const theme = useTheme();
    
    const handleUserSelect = () => {
        // implement user select
        
    };
    
    const postContent = {
        userName: post.userName,
        title: post.title,
        body: post.body,
        comments: post.comments ,
    };
    
    return (

        <PostStack direction="column">
            
            <Grid container>
                {/* User Image */}
                <Grid item xs={1}>
                    <div style={{ height: 50, cursor: 'pointer' }}
                        onClick={handleUserSelect}
                        role="button"
                    >
                    <DomainImage src={post.userImageUrl} alt={post.usersName} />
                    </div>   
                </Grid>

                {/* User Name */}
                <Grid item  xs={11} sx={{alignItems : "center", display : "flex"}}>
                    <div
                        onClick={handleUserSelect}
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            marginLeft={1}
                            color={theme.palette.primary.main}
                        >
                            {post.userName}
                        </Typography>
                    </div>
                </Grid>

                {/** Post images/ carousel */}
                <Grid item xs={12} sx={{marginTop : 1}}>
                    <ImageSlider images={post.imageUrls} />
                </Grid>

                {/* post Content */}
                <Grid item xs={12} sx={{marginTop : 1}}>
                    <Divider />
                        <Stack spacing={1}>
                            <Typography  variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
                            {postContent.title}
                            </Typography>
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="body2" fontWeight="light" >
                            {postContent.body}
                            </Typography>
                        </Stack>

                    <Divider />
                </Grid>

                {/* CommentBar */}
                <Grid item xs={12} sx={{marginTop : 1}}>
                    <CommentBar  />
                </Grid>

                <Grid item xs={12} sx={{marginTop : 1}}>
                    {/* User Comments */}
                    <Grid container marginTop={1} spacing={2} sx={{ width: "100%"  }}>
                    {postContent && postContent.comments ? (
                        postContent.comments.map((commentObj, index) => (
                        <Grid item key={index} xs={12}>
                            <UserComment commentObj={commentObj} />
                        </Grid>
                        ))
                        ) : (
                        <Grid item  xs={12}>
                            <Typography 
                            variant="body2"
                            color={theme.palette.secondary.dark}
                            >
                                No comments available...
                            </Typography>
                        </Grid>   
                        
                    )}
                    </Grid>

                </Grid>

            </Grid>
        </PostStack>

      );
};

export default FullPost;