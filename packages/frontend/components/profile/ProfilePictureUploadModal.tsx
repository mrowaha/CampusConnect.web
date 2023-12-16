import * as React from "react";

import {
  Modal, 
  ModalProps, 
  Box,
  Button,
  ButtonGroup,
  useTheme, 
  Typography
} from "@mui/material";
import {styled} from "@mui/system";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

import { DomainImageUpload } from "../shared/DomainImageUpload";


const StyledModal = styled(Modal)(({theme}) => ({
  display : "flex",
  justifyContent : 'center',
  alignItems: 'center',
})) as typeof Modal;

const CropContainer = styled("div")(({theme}) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  background: '#333',
  [theme.breakpoints.up('sm')]: {
    height: 400,
  },
}))

export interface ProfilePictureUploadModalProps extends Omit<ModalProps, "children">{
  closeModal : () => void;
  onUploadImage : (blob : Blob) => void | Promise<void>;
}


export function ProfilePictureUploadModal(props : ProfilePictureUploadModalProps) {

  const [imgBlob, setImgBlob] = React.useState<Blob | null>(null); 
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const handleImageFinal = (imgSrc : string, imgBlob : Blob) => {
    setImgSrc(`${imgSrc}`);
    setImgBlob(imgBlob);
  }

  const theme = useTheme();
 
  return (
    <StyledModal
      {...props}
    >
      
      <Box
        style={{
          backgroundColor : theme.palette.background.default,
          padding : "2rem",
          borderRadius : 5,
          width : "30%",
          minWidth : 400
        }}
      >
        <Typography variant="h6" component="h2">
          {props.title}
        </Typography>
        <DomainImageUpload 
          onImageFinal={handleImageFinal}
          justifyContent="left"
        />
          <Button 
            disabled={imgSrc === null}
            color="success"  
            onClick={() => {
              fetch(imgSrc!)
              .then(res => res.blob())
              .then(blob => props.onUploadImage(blob))
            }}
            sx={{
              textTransform : "none"
            }}
          >
            Upload
          </Button>
          
          <Button 
            color="error" 
            onClick={() => {
              setImgSrc(null);
              setImgBlob(null);
              props.closeModal();
            }}
            sx={{
              textTransform : "none"
            }}
          >
            Cancel
          </Button>
      </Box>
    </StyledModal>
  )

}