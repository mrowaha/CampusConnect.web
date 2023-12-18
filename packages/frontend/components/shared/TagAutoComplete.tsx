import * as React from "react";

import {
  Autocomplete,
  TextField
} from "@mui/material";
import { BACKEND_URL } from "@/routes";
import { useSnackbar } from "@/store/snackbar";

interface TagAutoCompleteProps {
  onTagsUpdate : (selected : string[]) => void | Promise<void>;
  debounce: number;
  intialTags: string[]
}


export function TagAutoComplete(props : TagAutoCompleteProps) {

  const [tags, setTags] = React.useState<string[]>([]);
  const [assignedTags, setAssignedTags] = React.useState<string[]>([]);

  const snackbar = useSnackbar();
  React.useEffect(() => {
    const fetchAvailableTags = async() => {
      try {
        const res = await fetch(`${BACKEND_URL}/product-tags/approved`, {
          method : "GET"
        })
        if (res.status !== 200) {
          snackbar("error", "failed to load tags");
          return;
        }
        const data = await res.json();
        setTags(() => {
          // @ts-ignore
          return Object.entries(data).map(([key, value]) => value.name );
        })
      } catch (err) {

      }
    }
    fetchAvailableTags();
    setAssignedTags(props.intialTags)

  }, []);

  const debounceRef = React.useRef<number | null>(null);

  const handleOnChange = (_ : any , newValues : string[]) => {
    setAssignedTags(newValues);
    if (props.debounce !== 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(props.onTagsUpdate, props.debounce, newValues);
    } else {
      props.onTagsUpdate(newValues);
    }
  };

  return (
    <Autocomplete 
      size="small"
      options={tags}
      value={assignedTags!}
      onChange={handleOnChange}          
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          placeholder="Search Tags"
          // variant="standard"
        />
      )}
    />
  )


}