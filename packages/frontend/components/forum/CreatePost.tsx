import React from "react" ;
import { DomainImage, DomainImageUpload } from '../shared';
import { Divider, Grid, Stack, Typography,TextField, useTheme } from "@mui/material";
import {  CommentBar, ImageSlider } from ".";
import {styled} from "@mui/system";
import { UserComment } from "./UserComment";
import { HeaderCreatePost } from "./HeaderCreatePost";

const PostStack = styled(Stack)(({theme}) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    backgroundColor: 'white',
    padding: "1rem"
}))

const TitleTextBox = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-input': {
        fontSize: '20px',    // Set the font size
        color: theme.palette.primary.main,       // Set the text color
        fontWeight: 'bold',
        '&:focus': {
          borderColor: theme.palette.primary.main, // Customize the focus border color
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '16px',    // Set the font size for the label
        color: theme.palette.primary.main,       // Set the label color
        fontWeight: 'bold',
    },
    
    }));

const BodyTextBox = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-input': {
        fontSize: '16px',    // Set the font size
        color: "black",       // Set the text color
        
        '&:focus': {
          borderColor: theme.palette.primary.main, // Customize the focus border color
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '16px',    // Set the font size for the label
        color: theme.palette.primary.main,       // Set the label color
        fontWeight: 'bold',
    },
    
    
    
}));

export const CreatePost = ({}) => {
    const theme = useTheme();
    const [imgBlob, setImgBlob] = React.useState<Blob | null>(null); 
    const [imgSrc, setImgSrc] = React.useState<string | null>(null);
    const handleImageFinal = (imgSrc : string, imgBlob : Blob) => {
        setImgSrc(`${imgSrc}`);
        setImgBlob(imgBlob);
    }
    
    const handleUserSelect = () => {
        // implement user select
        
    };
    
    const handleTitleChange = () => {
        // implement user select
        
    };
    
    return (

        <PostStack direction="column">
            
            <Grid container>
                {/* header with post and delete buttons */}
                <Grid item xs={12}>
                    <HeaderCreatePost />  
                </Grid>

                {/* post title */}
                <Grid item  xs={12} sx={{alignItems : "center", display : "flex"}}>
                <TitleTextBox
                    variant="outlined"
                    placeholder="Enter Post Title..."
                    fullWidth
                    multiline
                    rows={2}
                    margin="dense"
                    inputProps={{ maxLength: 150 }}
                    onChange={handleTitleChange}
                 />
                </Grid>
                {/* post body */}
                <Grid item  xs={12} sx={{alignItems : "center", display : "flex"}}>
                    <BodyTextBox
                        variant="outlined"
                        placeholder="Enter Post Description..."
                        fullWidth
                        multiline
                        margin="dense"
                        rows={10}
                        size="small"
                    />
                </Grid>

                {/** Post images upload*/}
                <DomainImageUpload 
                    onImageFinal={handleImageFinal}
                    justifyContent="left"
                />


                {/* post Content */}      

            </Grid>
        </PostStack>

      );
};

