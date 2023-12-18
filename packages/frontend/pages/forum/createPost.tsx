import * as React from "react";

import { Container,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  useTheme, 
  Grid,
  Button,
  Modal,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";


import type { ActionButtonProps } from "@/components/product";
import { PostActionsBar } from "@/components/product";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from "@/store/snackbar";
import { FilledInputField } from "@/components/shared";
import { useRouter } from "next/router";
import { DomainImageUpload } from "@/components/shared/DomainImageUpload";
import { TagAutoComplete } from "@/components/shared/TagAutoComplete";
import { BACKEND_URL } from "@/routes";
import { AUTH_TOKEN, currentUserAtom } from "@/auth";
import { DomainImageMultipleUpload } from "@/components/shared/DomainImageMultipleUpload";
import { useAtom } from "jotai";
import { blob } from "stream/consumers";


export default function ForumPostPage() {
  
  const router = useRouter();
  const {edit} = router.query;

  const [currentUser ]= useAtom(currentUserAtom);
  const theme = useTheme();
  const snackbar = useSnackbar();
  const handleOnSave = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/forumPosts/user/?userId=${currentUser.uuid}`, {
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body : JSON.stringify({
          title: title,
          description : description,
          postType: type,
        })
      })
      if (!res.ok) {
        snackbar("error", "Post creation failed");
        console.error(res);
        return;
      }

      // const data = await res.json();
      // const productId = data.body.split(":").at(-1);

      // const imgBlobsPromises = imgSrcs.map(url => 
      //   fetch(url).then(res => res.blob())  
      // );
      // const blobsAwaits = await Promise.allSettled(imgBlobsPromises);
      // const blobs = blobsAwaits.filter(({status}) => status === "fulfilled").map(({value}) => value);
      // console.log(blobs);  

      // const formData = new FormData();
      // for (let i = 0; i < blobs.length; i++) {
      //   formData.append(`file${i+1}`, blobs[i])
      // }
      // formData.append("productId", JSON.stringify({id : productId}));
      // const uploadRes = await fetch(`${BACKEND_URL}/s3/product-picture`, {
      //   method : "POST",
      //   headers: {
      //     "Authorization" : `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
      //   },
      //   body : formData
      // })
      // const fileResponse = await uploadRes.json();
      // console.log(fileResponse);
      router.replace("/forum?forumType=LOST");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnCancel = React.useCallback(() => {
    snackbar("warning", "cancelled");
    router.back(); 
  }, []);
  
  const handleOnDelete = React.useCallback(() => snackbar("error", "deleted"), []);
  
  const actionButtons = React.useMemo(() => {
    const buttons : ActionButtonProps[] = [];
    buttons.push(
      {
        text : "Save",
        onClick: handleOnSave,
        icon : <SaveIcon style={{fill : "white"}} />
      }
    );
    if (edit) 
      buttons.unshift(
        {
          text: "Delete",
          onClick: handleOnDelete,
          icon: <DeleteIcon style={{fill : "white"}} />
        }
      );
    buttons.unshift(
      {
        text: "Cancel",
        onClick: handleOnCancel,
        icon: <CloseIcon  style={{fill : "white"}} />
      }
    )
    return buttons;
  }, [handleOnSave, edit])
  
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<"LOST" | "FOUND">("LOST");
  const [status, setStatus] = React.useState<"AVAILABLE" | "DELETED">("AVAILABLE");

  const [imgBlob, setImgBlob] = React.useState<Blob | null>(null); 
  const [imgSrcs, setImgSrcs] = React.useState<string[]>([]);

  const handleImageFinal = (imgSrcs : string[]) => {
    setImgSrcs(imgSrcs);
  }


  return (
    <>
    <Container>
      <PostActionsBar 
        title={edit ? "Edit Forum Post" : "Post Forum Post"}
        actions={actionButtons}
      />  
      <Stack direction="column" sx={{border : `2px solid ${theme.palette.primary.main}`, padding: "1rem"}} gap={1.5}>
      {
        
        edit &&
        <FormControl>
          <FormLabel id="product-visibility">Product Visibility</FormLabel>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
          >
            <FormControlLabel value="AVAILABLE" control={<Radio color="primary" />} label="Visible" />
            <FormControlLabel value="DELETED" control={<Radio color="primary" />} label="Hidden" />
          </RadioGroup>
        </FormControl> 
      }
      <FormControl>
        <FormLabel id="product-type">Product Type</FormLabel>
        <RadioGroup
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
        >
          <FormControlLabel value="LOST" control={<Radio color="primary" />} label="Lost" />
          <FormControlLabel value="FOUND" control={<Radio color="primary" />} label="Found" />
        </RadioGroup>
      </FormControl> 
      <Divider orientation="horizontal"/> 
      <FilledInputField 
        label="Post Title"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
      />
      <FilledInputField 
        label="Post Description"
        placeholder="Enter Post Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        size="small"
      />

      {/* <DomainImageUpload 
        onImageFinal={handleImageFinal}
        justifyContent="left"
      /> */}

      <DomainImageMultipleUpload
        count={2} 
        onImageFinal={handleImageFinal}
        justifyContent="left"
      />

      </Stack>
    </Container>
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