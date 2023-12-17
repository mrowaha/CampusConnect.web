import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
// Importing icons
import {
  IconBooks,
  IconDeviceDesktopAnalytics,
  IconToolsKitchen,
  IconMusic,
  IconBike,
  IconDeviceGamepad2,
  IconArmchair
} from "@tabler/icons-react";

export default function CategoryNavBar() {
  const theme = useTheme();
  const router = useRouter();
  const mainColor = theme.palette.primary.main;
  
  const categories = [
    { name: "TextBooks", icon: <IconBooks size={20} color={`${mainColor}`}/> },
    { name: "Electronics", icon: <IconDeviceDesktopAnalytics size={20} color={`${mainColor}`}/> },
    { name: "Kitchenware", icon: <IconToolsKitchen size={20} color={`${mainColor}`}/> },
    { name: "Instruments", icon: <IconMusic size={20} color={`${mainColor}`}/> },
    { name: "Bicycles", icon: <IconBike size={20} color={`${mainColor}`}/> },
    { name: "Games", icon: <IconDeviceGamepad2 size={20} color={`${mainColor}`}/> },
    { name: "Furniture", icon: <IconArmchair size={20} color={`${mainColor}`}/> },
  ];

  return (
    <AppBar position="static" sx={{height: "fit-content", padding: "0.25rem 0.5rem", backgroundColor:'white', borderBottom: `2px solid ${theme.palette.primary.main}`}}>
      <Box sx={{ width: "100%" }}>
        <Grid container alignItems="center" justifyContent="center">
          {categories.map((category, index) => (
            <Button
              key={category.name}
              size="small"
              startIcon={category.icon}
              onClick={() => router.replace("/search")}
              sx={{
                width:"200px",
                // padding:"10px",
                textTransform: "none",
                borderLeft: index === 0 ? 0 : `1px solid ${theme.palette.primary.main}`,
                borderRight: index === 6 ? 0 :`1px solid ${theme.palette.primary.main}`,
              }}
            >
              {category.name}
            </Button>
          ))}
        </Grid>
      </Box>
    </AppBar>
  );
}

// export default CategoryNavBar;
