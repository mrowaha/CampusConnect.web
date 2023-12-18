import React, { useEffect, useState } from "react";
import { Container, Grid, Stack, Button, useTheme } from "@mui/material";
import { useRouter } from 'next/router';
import { PageTitle } from "@/components/shared/PageTitle"; // Adjust imports as needed
import { Post } from "@/components/forum"; // Adjust imports as needed
import { BACKEND_URL, FOUND_FORUM_SEARCH, LOST_FORUM_SEARCH } from "@/routes";
import { useSnackbar } from '@/store/snackbar';

export default function ForumPage() {
    const [forumType, setForumType] = useState('LOST'); // Default to 'LOST'
    const [keywords, setKeywords] = useState('');
    const [forumPosts, setForumPosts] = useState([]);
    const router = useRouter();
    const snackbar = useSnackbar();
    const theme = useTheme();

    useEffect(() => {
        if (router.isReady) {
            const queryType = router.query.forumType || 'LOST';
            setForumType(queryType.toUpperCase());
            setKeywords(router.query.keywords || '');
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (forumType) {
            getForumPosts();
        }
    }, [forumType, keywords]);

    const getForumPosts = async () => {
        const endpoint = forumType === 'LOST' ? `${BACKEND_URL}${LOST_FORUM_SEARCH}${keywords}` : `${BACKEND_URL}${FOUND_FORUM_SEARCH}${keywords}`;
        try {
            const res = await fetch(endpoint, {
                method : "GET",
                headers : { "Content-Type" : "application/json" }
            });
            const data = await res.json();
            setForumPosts(data);
            snackbar("success", "Forum Posts Loaded");
        } catch (err) {
            snackbar("error", (err as Error).message);
        }
    };

    const handleCreatePost = () => {
        router.push("/forum/createPost");
    };

    const handleForumTypeChange = (type) => {
        if (forumType !== type) {
            setForumType(type);
            router.push(`/forum?forumType=${type}&keywords=${keywords}`);
        }
    };

    return (
        <Container>
            <PageTitle pageTitle={"Forums"} />

            {/* Forum Buttons and Add Post Button */}
            <Stack direction="row" alignItems="center" justifyContent="center" marginLeft={2}>
                <Stack direction="row" spacing={2}>
                    <Button
                        size="medium"
                        variant="outlined"
                        onClick={() => handleForumTypeChange('LOST')}
                        sx={{
                            backgroundColor: forumType === 'LOST' ? theme.palette.primary.main : 'transparent',
                            color: forumType === 'LOST' ? '#ffffff' : theme.palette.primary.main,
                        }}
                    >
                        Lost
                    </Button>
                    <Button
                        size="medium"
                        variant="outlined"
                        onClick={() => handleForumTypeChange('FOUND')}
                        sx={{
                            backgroundColor: forumType === 'FOUND' ? theme.palette.primary.main : 'transparent',
                            color: forumType === 'FOUND' ? '#ffffff' : theme.palette.primary.main,
                        }}
                    >
                        Found
                    </Button>
                </Stack>

                <Stack direction="row" marginLeft={60}>
                    <Button
                        size="medium"
                        variant="outlined"
                        onClick={handleCreatePost}
                        sx={{
                            backgroundColor: forumType === 'CREATE' ? theme.palette.primary.main : 'transparent',
                            color: forumType === 'CREATE' ? '#ffffff' : theme.palette.primary.main,
                        }}
                    >
                        Create Post
                    </Button>
                </Stack>
            </Stack>

            {/* Post Listings */}
            {forumPosts.length > 0 && (
                <Grid container spacing={3} sx={{ width: "70%", margin: "0 auto" }}>
                    {forumPosts.map((post) => (
                        <Grid item key={post.id} xs={12}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
