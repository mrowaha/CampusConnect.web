// Post.js
import React, { useState } from 'react';
import { Box, Grid, IconButton, useTheme } from '@mui/material';
import {Circle} from "@mui/icons-material";
import { LeftIcon, RightIcon } from '@/icons';
import { DomainImage } from '../shared';

interface ImageSlider {
  images : string[];
}

export const ImageSlider = ({ images } : ImageSlider) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{position : "relative"}}>
      {/** prev button */}
      <Grid item style={{ display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handlePrev}>
          <LeftIcon filled={true} />
        </IconButton>
      </Grid>

      {/** left image */}
      <Grid item style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <DomainImage
          src={images[currentImageIndex]}
          alt={`Post Image ${currentImageIndex + 1}`}
        />
      </Grid>

      {/** next button */}
      <Grid item style={{ display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handleNext}>
          <RightIcon filled={true} />
        </IconButton>
      </Grid>
      <div style={{position : "absolute", bottom : -20}}>
        {
          React.Children.toArray(
            images.map((_, idx) => {
              return (
                <Circle sx={{fontSize: "small", fill : currentImageIndex === idx ? theme.palette.primary.main : theme.palette.secondary.main}}  />
              )
            }))
        }
        </div>
    </Grid>
  );
};
