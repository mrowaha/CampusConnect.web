import * as React from "react";
import { useAtom } from "jotai";
import { PROFILE_PICTURE, BACKEND_URL } from "@/routes";
import { currentUserAtom } from "@/auth";


export default function useProfilePicture() {
  const [currentUser] = useAtom(currentUserAtom);
  const [profileImgSrc, setProfileImgSrc] = React.useState<string>("/blank-profile-picture.webp");


  const fetchProfilePicture = React.useCallback(async () => {
    if (currentUser === null) return;
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
  }, [currentUser]);

  React.useEffect(() => {
    fetchProfilePicture();
  }, [currentUser]);

  return [profileImgSrc, fetchProfilePicture] as const;

}