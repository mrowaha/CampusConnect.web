import React from "react" ;
import { DomainImage } from '../shared';
import { Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import {  CommentBar, ImageSlider } from ".";
import {styled} from "@mui/system";
import { UserComment } from "./UserComment";
import { useAtom } from "jotai";
import {currentUserAtom} from "@/auth";
import { BACKEND_URL, CREATE_COMMENT } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import { useRouter } from 'next/router';

const PostStack = styled(Stack)(({theme}) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    backgroundColor: 'white',
    padding: "1rem"
}))

const FullPost = ({post, reloadData}) => {
    const router = useRouter();
    const theme = useTheme();
    const [loggedInUser, setLoggedInUser] = useAtom(currentUserAtom);
    const snackbar = useSnackbar();
    
    const handleUserSelect = () => {
        // implement user select
        
    };
    
    const onComment = (comment) => {

        if (loggedInUser != null){
            sendComment(loggedInUser.uuid, comment )
        }
        else{
            snackbar("error", "Login to Comment");
        }
    };

    const sendComment = async (userId: string, comment: any,) => {

        let newComment= {
            content:comment,
            forumPostId:post.forumPostId
        }

        try {
          const res = await fetch(`${BACKEND_URL}${CREATE_COMMENT}${userId}`, {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body:JSON.stringify(newComment)
          });

            snackbar("success", "Comment made successfully");
            reloadData()

        } catch (err: unknown) {
          snackbar("error", (err as Error).message);
        }
      } 
    
    const postContent = {
        userName: "",//`${post.postingUser.firstName} ${post.postingUser.lastName}`,
        title: post.title,
        body: post.description,
        comments: post.comments ,
    };
    
    return (

        <PostStack direction="column">
            
            {(post != null && (<Grid container>
                {/* User Image */}
                <Grid item xs={1}>
                    <div style={{ height: 50, cursor: 'pointer' }}
                        onClick={handleUserSelect}
                        role="button"
                    >
                    <DomainImage src={"/user-avatar.svg"} alt={`image`} />
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
                            {post.postingUser.firstName} {post.postingUser.lastName}
                        </Typography>
                    </div>
                </Grid>

                {/** Post images/ carousel */}
                <Grid item xs={12} sx={{marginTop : 1}}>
                    <ImageSlider images={["/product2-img.svg"]} />
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
                    <CommentBar  onComment={onComment}/>
                </Grid>

                <Grid item xs={12} sx={{marginTop : 1}}>
                    {/* User Comments */}
                    <Grid container marginTop={1} spacing={2} sx={{ width: "100%"  }}>
                        {postContent.comments.map((commentObj , index) => (
                            <Grid item key={index} xs={12}>
                                <UserComment commentObj={commentObj} />
                            </Grid>
                        ))}
                    </Grid>

                </Grid>

            </Grid> ))}
        </PostStack>

      );
};

export default FullPost;