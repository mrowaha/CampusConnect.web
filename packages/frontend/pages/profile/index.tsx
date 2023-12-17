import Link from "next/link";
import * as React from "react";

import {
  Stack,
  Divider,
  Button
} from "@mui/material";
import {styled} from "@mui/system";

import { authAtom, currentUserAtom, User } from "@/auth";
import { useAtom } from "jotai";

import { InfoContainer, ProfilePictureUploadModal } from "@/components/profile";
import { PROFILE_PICTURE, BACKEND_URL } from "@/routes";
import useProfilePicture from "@/hooks/useProfilePicture";

export type ProfilePictureUploadResponse = {
  contentType : "image/jpg" | "image/jpeg" | "image/png";
  createdTime: string;
  fileSize: number;
  fileName : string;
}

export const ProfilePageContainer = styled(Stack)(({theme}) => ({
  padding : "2rem",
  inset : 0,
  position : "absolute"
}));

export default function ProfilePage() {

  const [currentUser] = useAtom(currentUserAtom);
  const [token] = useAtom(authAtom);

  const [profileImgSrc, refetch] = useProfilePicture();
  const [showUploadProfilePic, setShowUploadProfilePic] = React.useState<boolean>(false);
  const handleProfilePictureUpload = async (imageBlob : Blob) => {
    if (imageBlob) {
      const formData = new FormData();
      formData.append("file", imageBlob);
      const res = await fetch(`${BACKEND_URL}${PROFILE_PICTURE}`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${token}`
        },
        body: formData,
      })
      const data = await res.json();
      console.log(data);
      refetch();
      setShowUploadProfilePic(false);      
    }    
  }

  // React.useEffect(() => {
  //   if (currentUser) {
  //     fetchProfilePicture(currentUser);
  //   }
  // }, [currentUser])


  return (
    <>
      <ProfilePictureUploadModal 
        title="Select Your Profile Picture"
        open={showUploadProfilePic}
        closeModal={() => setShowUploadProfilePic(false)}
        onUploadImage={handleProfilePictureUpload}
      />
      <ProfilePageContainer direction="row">
        {
          currentUser &&
            <InfoContainer
              imgAlt="logged in user profile picture"
              imgSrc={profileImgSrc}
              pictureStyles={{width : "70%"}}
              updatable={true}
              onProfilePictureUpdate={() => setShowUploadProfilePic(true)}
              uuid={currentUser.uuid}
              firstName={currentUser.firstName}
              lastName={currentUser.lastName}
              role={currentUser.role}
              email={currentUser.email}
              trustScore={currentUser.trustScore}
            >
              <Link
                href={`/profile/settings`}
              >
                <Button
                variant="outlined"
                sx={{
                  textTransform : "none"
                }}
                >
                  Profile Settings
                </Button>
              </Link>        
            </InfoContainer>
        }
        <Divider 
          orientation="vertical"
        />
      </ProfilePageContainer>
    </>

  )
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}


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