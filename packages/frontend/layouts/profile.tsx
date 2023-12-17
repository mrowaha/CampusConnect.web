import Link from "next/link";
import * as React from "react";

import {
  Stack,
  Divider,
  Box,
  Button
} from "@mui/material";
import {styled} from "@mui/system";

import { authAtom, currentUserAtom, User } from "@/auth";
import { useAtom } from "jotai";

import { InfoContainer, ProfilePictureUploadModal } from "@/components/profile";
import { PROFILE_PICTURE, BACKEND_URL } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import { TabButtons }from "@/components/profile";

type ProfilePictureUploadResponse = {
  contentType : "image/jpg" | "image/jpeg" | "image/png";
  createdTime: string;
  fileSize: number;
  fileName : string;
}

export const ProfilePageContainer = styled(Stack)(({theme}) => ({
  inset : 0,
  position : "absolute",
  overflow: "hidden"
}));


const PageWrapper = styled(Box)(() => ({
  width : "100%", 
  overflowY: "scroll", 
  height : "100%"
})) as typeof Box;


export default function ProfilePageLayout({children} : {children : React.ReactNode}) {


  const [currentUser] = useAtom(currentUserAtom);
  const [token] = useAtom(authAtom);

  const [profileImgSrc, setProfileImgSrc] = React.useState<string>("/blank-profile-picture.webp");

  const [showUploadProfilePic, setShowUploadProfilePic] = React.useState<boolean>(false);

  const fetchProfilePicture = async (currentUser : User) => {
    try {
      const response = await fetch(`${BACKEND_URL}${PROFILE_PICTURE}?userid=${currentUser.uuid}&role=${currentUser.role}`);

      if (!response.ok) {
        console.error('Error fetching profile picture:', response.statusText);
        return;
      }
      const blob = await response.blob();
      if (blob.size == 0) return;
      const blobUrl = URL.createObjectURL(blob);
      setProfileImgSrc(blobUrl);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  }

  const handleProfilePictureUpload = async (imageBlob : Blob) => {
    if (imageBlob) {
      console.log(token);
      console.log(imageBlob);
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
      fetchProfilePicture(currentUser!);
      setShowUploadProfilePic(false);      
    }    
  }

  React.useEffect(() => {
    if (currentUser) {
      fetchProfilePicture(currentUser);
    }
  }, [currentUser])

  
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
        <Stack >
        <Stack>
          <TabButtons />
        </Stack>
        <Stack> 
        <PageWrapper>
          {children}
        </PageWrapper>
        </Stack>
        </Stack>
      </ProfilePageContainer>
    </>
  )
}