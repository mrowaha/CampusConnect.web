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
  const [croppedImgUrl, setCroppedImgUrl] = React.useState<string | null>(null);

  const [cropping, setCropping] = React.useState<boolean>(false);

  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [rotation, setRotation] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null)

  // @ts-ignore
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleOnImgSelect = React.useCallback((filelist : FileList | null) => {
    if (filelist) {
      setCroppedImgUrl(URL.createObjectURL(filelist[0]));
      setImgBlob(filelist[0]);
      setCropping(true);
    } else {
      setCroppedImgUrl(null);
      setImgBlob(null);
      setCropping(false);      
    }
  }, [])


  const handleCropSelection = async () => {
    const newImgSrc = await getCroppedImg(
      URL.createObjectURL(imgBlob as Blob),
      croppedAreaPixels,
      rotation
      );
    setCroppedImgUrl(newImgSrc);
    setCropping(false);
  }

  const handleCropCancel = () => {
    setImgBlob(null);
    setCroppedImgUrl(null);
    setCropping(false);
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
        {
          cropping ?
          <div style={{display : "flex", flexDirection : "column", alignItems :"center", gap : 10}}>
          <CropContainer>
            <Cropper 
              image={croppedImgUrl as string}
              aspect={1 / 1}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />          
          </CropContainer>
          
            <Button 
              color="success"  
              onClick={handleCropSelection}
              sx={{
                textTransform : "none"
              }}
            >
              Confirm Crop
            </Button>
            <Button 
              color="error" 
              onClick={handleCropCancel}
              sx={{
                textTransform : "none"
              }}
            >
              Cancel Crop
            </Button>
          </div>
          :
          <>
          <DomainImageUpload 
            imageBlob={imgBlob}
            imageSrc={croppedImgUrl}
            onImageSelect={handleOnImgSelect}
          />
            <Button 
              disabled={croppedImgUrl == null}
              color="success"  
              onClick={() => {
                fetch(croppedImgUrl!)
                .then(r => r.blob())
                .then(blob => props.onUploadImage(blob));  
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
                setCropping(false);
                setCroppedImgUrl(null);
                setImgBlob(null);
                props.closeModal();
              }}
              sx={{
                textTransform : "none"
              }}
            >
              Cancel
            </Button>
          </>

        }
      </Box>
    </StyledModal>
  )

}