import * as React from "react";

import ProtectedRoute, { AUTH_TOKEN } from "@/auth";
import { DomainImageUpload } from "@/components/shared/DomainImageUpload";
import { Button } from "@mui/material";
import { useImageUpload } from "@/hooks/useImageUpload";
import { BACKEND_URL } from "@/routes";

type ProfilePictureUploadResponse = {
  contentType : "image/jpg" | "image/jpeg" | "image/png";
  createdTime: string;
  fileSize: number;
  fileName : string;
}

export default function ProfilePage() {

  const [imgBlob, handleImageSelect, uploadImage, response, error] = useImageUpload<ProfilePictureUploadResponse, any>(
    true,
    "POST", 
    null,
    `/s3/profile-picture`
  );

  React.useEffect(() => {
    console.log(response);
    console.log(error);
  }, [response, error])


  const [resultURL, setResultUrl] = React.useState<string | null>(null);

  const handleGetRequest = () => {
    const fetchProfilePicture = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN);
        const response = await fetch(`${BACKEND_URL}/s3/profile-picture`, {
          method : "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        setResultUrl(blobUrl);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    }

    fetchProfilePicture();
  }

  return (
    <>
      <DomainImageUpload 
        imageBlob={imgBlob}
        onImageSelect={handleImageSelect}      
      />
      <Button
        color="primary"
        onClick={uploadImage}
      >
        Send
      </Button> 
      <Button
        color="primary"
        onClick={handleGetRequest}
      >
        Get
      </Button> 
      {
        resultURL &&
        <img src={resultURL} style={{maxWidth : "100%"}} />
      }   
    </>
  )
}