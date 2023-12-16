import React from "react" ;

import { Box, Stack, Typography, useTheme } from "@mui/material"

export const PostTextBox = ({content}) => {
    const theme = useTheme();
           
    return(
        <Box>
            <Stack spacing={2}>
                <Typography noWrap variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
                {content.title}
                </Typography>
            </Stack>

            <Stack spacing={2}>
                <Typography variant="body2" fontWeight="light" >
                {content.body}
                </Typography>
            </Stack>
            <Stack spacing={2}>
                {/** view all commments text, not a link for now */}
                <Typography variant="body2" fontWeight= "light" color={theme.palette.primary.main} >
                View all Comments...  
                </Typography>
            </Stack>
        </Box>
    );
};