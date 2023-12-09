import * as React from "react";

import {
  Stack,
  Divider
} from "@mui/material";
import {styled} from "@mui/system";

import { currentUserAtom } from "@/auth";
import { useAtom } from "jotai";

import { InfoContainer } from "@/components/profile";
import { PROFILE_PICTURE, BACKEND_URL } from "@/routes";

type ProfilePictureUploadResponse = {
  contentType : "image/jpg" | "image/jpeg" | "image/png";
  createdTime: string;
  fileSize: number;
  fileName : string;
}

const ProfilePageContainer = styled(Stack)(({theme}) => ({
  padding : "2rem",
  inset : 0,
  position : "absolute"
}))

export default function ProfilePage() {

  const [currentUser] = useAtom(currentUserAtom);

  const [profileImgSrc, setProfileImgSrc] = React.useState<string>("/blank-profile-picture.webp");

  React.useEffect(() => {
    if (currentUser) {
      const fetchProfilePicture = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}${PROFILE_PICTURE}`, {
            method : "GET",
            body : JSON.stringify({
              uuid : currentUser.uuid,
              role : currentUser.role
            })
          });

          if (!response.ok) {
            // Handle error
            console.error('Error fetching profile picture:', response.statusText);
            return;
          }

          // Read the response as a blob
          const blob = await response.blob();

          // Create a Blob URL
          const blobUrl = URL.createObjectURL(blob);
          setProfileImgSrc(blobUrl);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }

      fetchProfilePicture();
    }
  }, [currentUser])

  
  return (
    <ProfilePageContainer direction="row">
      {
        currentUser &&
          <InfoContainer
          imgAlt="logged in user profile picture"
          imgSrc={profileImgSrc}
          pictureStyles={{width : "70%"}}
          uuid={currentUser.uuid}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          role={currentUser.role}
          email={currentUser.email}
          trustScore={currentUser.trustScore}
          settings={{ 
            redirect : true,
            url : "hello"
          }}
          />
      }
      <Divider 
        orientation="vertical"
      />
    </ProfilePageContainer>
  )
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}

// const [imgBlob, handleImageSelect, uploadImage, response, error] = useImageUpload<ProfilePictureUploadResponse, any>(
//   true,
//   "POST", 
//   null,
//   `/s3/profile-picture`
// );

// React.useEffect(() => {
//   console.log(response);
//   console.log(error);
// }, [response, error])


// const [resultURL, setResultUrl] = React.useState<string | null>(null);

// const handleGetRequest = () => {
//   const fetchProfilePicture = async () => {
//     try {
//       const token = localStorage.getItem(AUTH_TOKEN);
//       const response = await fetch(`${BACKEND_URL}/s3/profile-picture`, {
//         method : "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         // Handle error
//         console.error('Error fetching profile picture:', response.statusText);
//         return;
//       }

//       // Read the response as a blob
//       const blob = await response.blob();

//       // Create a Blob URL
//       const blobUrl = URL.createObjectURL(blob);
//       setResultUrl(blobUrl);
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     }
//   }

//   fetchProfilePicture();
// }

// return (
//   <>
//     <DomainImageUpload 
//       imageBlob={imgBlob}
//       onImageSelect={handleImageSelect}      
//     />
//     <Button
//       color="primary"
//       onClick={uploadImage}
//     >
//       Send
//     </Button> 
//     <Button
//       color="primary"
//       onClick={handleGetRequest}
//     >
//       Get
//     </Button> 
//     {
//       resultURL &&
//       <img src={resultURL} style={{maxWidth : "100%"}} />
//     }   
//   </>
// )