import React from "react" ;

import { Box,  Grid,  Typography,IconButton, useTheme, Tooltip } from "@mui/material"
import { DomainImage } from "../shared";
import { ReportIcon } from "@/icons";

export const UserComment = ({commentObj}) => {
    const theme = useTheme();
    const handleReport = () => {
        // Implement report functionality
    };
    const handleUserSelect = () => {
        // implement user select
        
    };
           
    return(
        <Box  >
            <Grid container>
                {/* User Image */}
                <Grid item xs={1}>
                    <div  style={{ height: 30, cursor: 'pointer' }}
                        onClick={handleUserSelect}
                        role="button"
                    >
                        <DomainImage src={"/user-avatar.svg"} alt={commentObj.usersName} />
                    </div>   
                </Grid>
        
                {/* User Name and comment body*/}
                <Grid item  xs={10.5} sx={{alignItems : "center", display : "flex"}}>
                
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    marginLeft={1} 
                    color={theme.palette.primary.main}
                    sx={{ cursor: 'pointer'}} // Use relative sizing
                >
                    <div
                    onClick={handleUserSelect}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        {commentObj.commenter.firstName} {commentObj.commenter.lastName}
                    </div>
                    {/*comment body*/} 
                    <Typography variant="body2" fontWeight="light" >
                    {commentObj.content}
                    </Typography>
                </Typography>
                </Grid>
                <Grid item xs={0.5}>
                        <IconButton onClick={handleReport} sx={{ color: theme.palette.primary.main }}>
                            <ReportIcon filled={ true} />
                        </IconButton>
                </Grid>
                
            </Grid>
        </Box>
    );
};