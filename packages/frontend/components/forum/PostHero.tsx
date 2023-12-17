import React from "react" ;
import { DomainImage } from '../shared';
import { Divider, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { PostTextBox, CommentBar } from ".";
import {styled} from "@mui/system";

const PostStack = styled(Stack)(({theme}) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    backgroundColor: 'white',
    padding: "1rem"
}))

export function PostHero({ post, onSubmit} : {post : any, onSubmit : any}) {
    const theme = useTheme();
    return (
        <PostStack direction="column">
            <Grid container>
                <Grid item  xs={9}>
                    <Grid container>
                        {/* User Image */}
                        <Grid item xs={1}>
                            <div style={{height : 50}}>
                                <DomainImage src={post.userImageUrl} alt={post.usersName} />
                            </div>   
                        </Grid>
                
                        {/* User Name */}
                        <Grid item  xs={11} sx={{alignItems : "center", display : "flex"}}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                marginLeft={1} 
                                color={theme.palette.primary.main}
                                sx={{ cursor: 'pointer'}} // Use relative sizing
                            >
                                {post.userName}
                            </Typography>
                        </Grid>
                        {/* post Content */}
                        <Grid item xs={12} sx={{ marginTop: 1 }}>
                            <Divider    />
                                <PostTextBox content={post} isFullPost={ false} />
                            <Divider  />
                        </Grid>
                    </Grid>
                </Grid>
                
                {/**Outer Grid2 --- image grid */}
                <Grid item xs={3} sx={{alignItems : "center" }}> 
                    <div style={{height : 150}}>
                        <DomainImage src={post.productImageUrl} alt={post.title} />
                    </div> 
                </Grid>
            {/**Outer Grid ends here */}
            </Grid>
            {/**Comment Bar */}
            <CommentBar onReportSubmit={onSubmit} />
        </PostStack>

      );
};