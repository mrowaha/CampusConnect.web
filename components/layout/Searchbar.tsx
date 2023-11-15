import * as React from "react";

import {
  TextField,
  IconButton,
  Grid,
  Button
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";


import { FilledInputField } from "../shared";

export default function Searchbar() {

  const [value, setValue] = React.useState("");

  return (
    <Grid container sx={{height : 40}}>
      <Grid item xs={9}>
        <TextField 
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <Button 
          variant="contained"
          color="primary"
          startIcon={<SearchOutlined />}
        />
      </Grid>
    </Grid>
  )

}