import * as React from "react";

import {
  Grid,
  Box,
  IconButton,
  SvgIcon,
  useTheme,
  Modal,
  Button,
  Typography
} from "@mui/material";
import {styled} from "@mui/system";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";


import { DomainImage } from ".";

interface DropBoxStyleProps {
  backgroundColor? : string;
  borderColor? : string;
  padding? : string;
  position? : "relative" | "static";
};

const DropBox = styled(Box)<DropBoxStyleProps>(({theme, backgroundColor, borderColor, padding, position}) => ({
  width : "100%",
  position : position  || "static",
  backgroundColor : theme.palette.primary.light,
  border : `3px dashed ${borderColor || theme.palette.secondary.main}`,
  display : "flex",
  flexDirection : "column",
  justifyContent : "center",
  alignItems : "center",
  padding : padding || "1rem",
  borderRadius : "5px",
  "& > label" : {
    backgroundColor : theme.palette.primary.main,
    color : "#fff",
    padding : "0.25rem",
    borderRadius : "5px",
    fontFamily : "Roboto",
    fontSize : "0.75em"
  },
  "& > label:hover" : {
    cursor : "pointer"
  }
}));

const StyledModal = styled(Modal)(({theme}) => ({
  display : "flex",
  justifyContent : 'center',
  alignItems: 'center'
})) as typeof Modal;

const CropContainer = styled("div")(({theme}) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  [theme.breakpoints.up('sm')]: {
    height: 400,
  },
}))

export interface DomainImageUploadProps extends DropBoxStyleProps {
  onImageFinal: (imgSrc : string, imgBlob : Blob) => void;
  justifyContent? : string;
}

export function DomainImageUpload (props : DomainImageUploadProps) {
  
  const theme = useTheme();

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

  React.useEffect(() => {
    if (imgBlob && croppedImgUrl && !cropping) {
      props.onImageFinal(croppedImgUrl, imgBlob);      
    }
  }, [imgBlob, croppedImgUrl, cropping]);


  return (
    <>
      <StyledModal
        open={cropping} 
      >
        <div style={{display : "flex", flexDirection : "column", alignItems :"center", gap : 10, backgroundColor: "#fff", width : "50vw"}}>
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
      </StyledModal>
      <Grid container gap={2} justifyContent={props.justifyContent || "left"}> 
        <Grid item xs={6}>
          <DropBox
            backgroundColor={theme.palette.primary.light}
            borderColor={props.borderColor}
            position="static"
            sx={{
              height : 150
            }}
          >
            <SvgIcon
              sx={{
                width : 50,
                height : 50
              }}
            >
              <svg 
                fill={props.borderColor || theme.palette.secondary.main}
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"/>
              </svg>
            </SvgIcon>
            <Typography
              variant="body1"
              color={props.borderColor || theme.palette.primary.main}
            >
              Upload Image
            </Typography>
            <input
              id="profile-picture"
              style={{display : "none"}}
              type="file"
              onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                /** @ts-ignore */
                // props.onImageSelect(event.target.files);
                handleOnImgSelect(event.target.files);
              }}
            />
            <label htmlFor="profile-picture">
              or Choose Image
            </label>
          </DropBox>
        </Grid>
        <Grid item xs={4}>
        {croppedImgUrl && !cropping ? 
          <DropBox
            backgroundColor="none"
            borderColor="none"
            padding="0rem"
            position="relative"
            sx={{
              width : 150,
              aspectRatio : "1/1"
            }}
          >  
            <DomainImage 
              alt="not found"
              src={croppedImgUrl}
            />
            <IconButton
              onClick={() => handleCropCancel()}
              sx={{
                position : "absolute",
                left: 0,
                top: 0
              }}
              size="small"
            >
              <SvgIcon
                fontSize="small"
                sx={{
                  "&:hover" : {
                    cursor : "pointer"
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill={theme.palette.error.main} xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill={theme.palette.error.main}/>
                </svg>
              </SvgIcon>
            </IconButton>
          </DropBox>
          : 
          <></>
        }
        </Grid>
      </Grid>    
    </>
    
  )
};