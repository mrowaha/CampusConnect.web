// Post.js
import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { LeftIcon, RightIcon } from '@/icons';

export const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Grid container spacing={2} justifyContent="center" >
      {/** prev button */}
      <Grid item style={{ display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handlePrev} disabled={currentImageIndex === 0}>
          <LeftIcon filled={true} />
        </IconButton>
      </Grid>

      {/** left image */}
      <Grid item style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <img
          src={images[currentImageIndex]}
          alt={`Post Image ${currentImageIndex + 1}`}
          style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }}
        />
      </Grid>

      {/** right image */}
      <Grid item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
  <Box width="200px" height="200px">
    <img
      src={images[currentImageIndex + 1]} // Display the next image
      alt={`Post Image ${currentImageIndex + 2}`}
      style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </Box>
</Grid>

      {/** next button */}
      <Grid item style={{ display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handleNext} disabled={currentImageIndex === images.length - 2}>
          <RightIcon filled={true} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
