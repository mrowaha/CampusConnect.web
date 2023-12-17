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
import { AUTH_TOKEN } from "@/auth";



export default function ProductPostPage() {
  
  const router = useRouter();
  const {edit} = router.query;

  const theme = useTheme();
  const snackbar = useSnackbar();
  const handleOnSave = React.useCallback(() => snackbar("success", "saved"), []);
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
  }, [handleOnSave])
  
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<"rent" | "purchase">("rent");
  const [status, setStatus] = React.useState<"visible" | "hidden">("hidden");
  const [price, setPrice] = React.useState<string>("");

  const [assignedTags, setAssignedTags] = React.useState<string[]>([]);
  // @ts-ignore
    const handleOnChange = (newValues : string[]) => {
    setAssignedTags(newValues);
  };

  const [imgBlob, setImgBlob] = React.useState<Blob | null>(null); 
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const handleImageFinal = (imgSrc : string, imgBlob : Blob) => {
    setImgSrc(`${imgSrc}`);
    setImgBlob(imgBlob);
  }


  const [requestTagModal, setRequestTagModal] = React.useState<boolean>(false);
  const [newTagName, setNewTagName] = React.useState<string>("");

  const handleTagRequest = async () => {
    try {
      const auth = localStorage.getItem(AUTH_TOKEN);
      const res = await fetch(`${BACKEND_URL}/product-tags`, {
        method : "POST",
        headers: {
          "Authorization": `Bearer ${auth}`,
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          name : newTagName
        })
      });
      if (res.status !== 200) {
        snackbar("error", "failed to place request");
        console.log(await res.json());
      } 
      const data  =await res.json();
      console.log(data);
      snackbar("success", "request placed");
      setRequestTagModal(false);
    } catch (err) {
      console.error(err);
      snackbar("error", err as string);
    }
  }

  return (
    <>
    <Container>
      <PostActionsBar 
        title={edit ? "Edit Item" : "List Item"}
        actions={actionButtons}
      />  
      <Stack direction="column" sx={{border : `2px solid ${theme.palette.primary.main}`, padding: "1rem"}} gap={1.5}>
      <FormControl>
        <FormLabel id="product-visibility">Product Visibility</FormLabel>
        <RadioGroup
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <FormControlLabel value="visible" control={<Radio color="primary" />} label="Visible" />
          <FormControlLabel value="hidden" control={<Radio color="primary" />} label="Hidden" />
        </RadioGroup>
      </FormControl> 
      <FormControl>
        <FormLabel id="product-type">Product Type</FormLabel>
        <RadioGroup
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
        >
          <FormControlLabel value="rent" control={<Radio color="primary" />} label="Rent" />
          <FormControlLabel value="purchase" control={<Radio color="primary" />} label="Purchase" />
        </RadioGroup>
      </FormControl> 
      <Divider orientation="horizontal"/> 
      <FilledInputField 
        label="Product Name"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
      />
      <FilledInputField 
        label="Product Description"
        placeholder="Enter Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        size="small"
      />
      <FilledInputField 
        label={type === "rent" ? "Product Rate Per Day (TL per day)" : "Product Starting Price (TL)"}
        placeholder={type === "rent" ? "Enter daily rate in tl" : "Enter starting price in tl"}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        size="small"
      />

      <Grid container  justifyContent="space-between">
        <Grid item xs={6}>
            <TagAutoComplete 
              debounce={0}
              onTagsUpdate={handleOnChange}
            />
        </Grid>
        <Grid item xs={2}>
            <Button 
              fullWidth
              size="large"
              variant="contained"
              onClick={() => setRequestTagModal(true)}
            >
              Request A Tag
            </Button>
        </Grid>
      </Grid>

      <DomainImageUpload 
        onImageFinal={handleImageFinal}
        justifyContent="left"
      />

      </Stack>
      <PostActionsBar 
        title={edit ? "Edit Item" : "List Item"}
        actions={actionButtons}
      />  
      <div 
        style={{
          width : "100%",
          height : "25px"
        }}
      />
    </Container>
    <Modal
      open={requestTagModal}
      sx={{
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
      }}
    >
      <Box
        sx={{
          backgroundColor : theme.palette.background.default,
          padding : "2rem",
          borderRadius : 5,
          width : "30%",
          minWidth : 400,
          position : "relative"
        }}
      >
        <IconButton
          size="small"
          sx={{position : "absolute", top : -10, right :-10, backgroundColor: "red"}}
          onClick={() => {setRequestTagModal(false); setNewTagName("");}}
        >
          <CloseOutlined style={{fill : "white"}} />
        </IconButton>
        <Grid container gap={2} justifyContent="space-between">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" color="primary">
              Request Tag
            </Typography>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item xs={12}>
          <FilledInputField
            placeholder="Enter a tag that best categorizes your product"
            label="Tag Name"
            fullWidth
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            multiline={false}
            size="small"
            background="white"
            hoverbackground={theme.palette.secondary.light}
            focusedbackground={theme.palette.secondary.light}
          />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" onClick={handleTagRequest}>
              Request
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
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