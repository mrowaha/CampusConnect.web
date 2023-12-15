import React, { useState } from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/system";
import {Notifications} from "@/components/settings";

import { useSnackbar } from "@/store/snackbar";
import { BACKEND_URL, LOGIN_BILKENTEER, LOGIN_MODERATOR } from "@/routes";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";
import { AUTH_TOKEN, authAtom, currentUserAtom } from "@/auth";
import {
  Box,
  useTheme,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Switch,
  FormGroup,
  FormControl,
  Divider,
} from "@mui/material";

import { FilledInputField } from "@/components/shared";
import { NotificationPreference } from "@/components/settings/NotificationPreference";
import { LanguagePreference } from "@/components/settings/LanguagePreference";

const Settings = () => {
    const router = useRouter();
    const theme = useTheme();
//   const { data: session } = useSession();
//   const names = session.user.name.split(" ");
//   const firstName = names[0];
//   const lastName = names.length > 1 ? names[names.length - 1] : "";
  const [formData, setFormData] = useState({
    firstName: "Mehshid",
    lastName: "Atiq",
    email: "abc@ug.bilkent.edu.tr",
    phone: "05467666666",
    address: "Bilkent University",
    password: "",
  });

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      
    }));
  };

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // Submit form data to server here
  };
  // for the notifications part
  const [showMyProducts, setShowRevenue] = React.useState(true);
  const [showMyInbox, setShowProfit] = React.useState(true);
  const [showMyForumPosts, setShowOrders] = React.useState(true);
  const [showMyWishlist, setShowCustomers] = React.useState(true);
  const [showMyBids, setShowMyBids] = React.useState(true);
  
  const [showEmailPreference, setEmailPreference] = React.useState(true);
  const [showAppPreference, setAppPreference] = React.useState(true);

  const [showTurkishPreference, setTurkishPreference] = React.useState(true);

  
  

  const handleShowMyProducts = (event : any) => {
    setShowRevenue(event.target.checked);
  };

  const handleShowMyInbox = (event : any) => {
    setShowProfit(event.target.checked);
  };

  const handleShowMyForumPosts = (event : any) => {
    setShowOrders(event.target.checked);
  };

  const handleShowMyWishlist = (event : any) => {
    setShowCustomers(event.target.checked);
  };
  const handleShowMyBids = (event : any) => {
    setShowMyBids(event.target.checked);
  };
  const handleEmailPrefernce = (event : any) => {
    setEmailPreference(event.target.checked);
  };
  const handleAppPreference = (event : any) => {
    setAppPreference(event.target.checked);
  };
  const handleTurkishPreference = (event : any) => {
    setTurkishPreference(event.target.checked);
  };

  const handleNotificationsSubmit = (event : any) => {
    event.preventDefault();
    // handle form submission
  };
  return (
    <>
      <Box>
        <Paper sx={{ padding: "1rem 2rem" }}>
        <Typography variant="h4" sx={{
        color: '#000',
        fontFamily: 'Cairo',
        fontSize: '2.5rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '1.375rem',
        paddingTop: 2,
        paddingBottom: 5,
        textAlign: 'center',
        }}>
        Settings
        </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small" 
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small" 
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      size="small" 
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      helperText="current registered email"
                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small" 
                      fullWidth
                      type="tel"
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      inputProps={{
                        pattern: "[0-9]*",
                        minLength: 10,  // Minimum length for a valid phone number
                        maxLength: 15,  // Maximum length for a valid phone number
                      }}
                      helperText="Please enter a valid phone number (numeric digits only)"
                    
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        size="small"
                        fullWidth
                        type="text"  
                        label="Address" 
                        name="address"  
                        value={formData.address}  
                        onChange={handleFormChange}
                        
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"  
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            </Grid>

            <Divider
                variant="fullWidth"
                style={{
                    height: '8px', 
                }}
            />
            <>
            <Typography variant="h4"  sx={{
                color: '#000',
                fontFamily: 'Cairo',
                fontSize: ' 2.5 rem',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '1.375rem',
                paddingTop: 5,
                paddingBottom: 2,
                textAlign: 'center',
            }}>
                Notifications
            </Typography>
            <Box>
            <form onSubmit={handleNotificationsSubmit}>
                {/* Left grid */}
                <FormControl component="fieldset" sx={{width: "100%"}}>
                    <Grid container justifyContent="space-around" >
                    <Grid item xs={2}>
                        <Notifications
                        showMyProducts={showMyProducts}
                        showMyInbox={showMyInbox}
                        showMyForumPosts={showMyForumPosts}
                        showMyWishlist={showMyWishlist}
                        showMyBids={showMyBids}
                        handleShowMyProducts={handleShowMyProducts}
                        handleShowMyInbox={handleShowMyInbox}
                        handleShowMyForumPosts={handleShowMyForumPosts}
                        handleShowMyWishlist={handleShowMyWishlist}
                        handleShowMyBids={handleShowMyBids}
                    />                        
                    </Grid>
                    {/* Right grid */}
                    {/* Notification Prefrence */}
                    <Grid item xs={2}>
                      <NotificationPreference 
                        showEmailPreference ={showEmailPreference}
                        showAppPreference ={showAppPreference}
                        handleEmailPrefernce ={handleEmailPrefernce}
                        handleAppPreference = {handleAppPreference}
                      />
                    {/* Language preference */}
                      <LanguagePreference
                        showTurkishPreference = {showTurkishPreference}
                        handleTurkishPreference = {handleTurkishPreference}
                      />
                    </Grid>
                    </Grid>
                </FormControl>
                </form>
            </Box>
            </>
        </Paper>
      </Box>
    </>
  );
};

export default Settings;

// export async function getStaticProps() {
//     return {
//       props : {
//         protected : true
//       }
//     }
//   }
  