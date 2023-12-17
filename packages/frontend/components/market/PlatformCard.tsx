import React from 'react';
import { DomainImage } from '../shared';
import {  Paper, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const PlatformCard = ({ platform }) => {
  const router = useRouter();
  const theme = useTheme();
  const [isPlatformSelected, setPlatformSelected] = React.useState(platform.isSelected);

  const handlePlatformSelect = () => {
    setPlatformSelected(!isPlatformSelected);
    router.push(platform.link)
  };

  return (
    <Paper
      sx={{
        isolation: 'isolate',
        height: '250px',
        position: 'relative',
        border: `2px solid ${isPlatformSelected ? theme.palette.primary.main : theme.palette.secondary.main}`,
        '&>div:hover': {
          backgroundColor: '#FFFFFF55',
          cursor: "pointer"
        },
      }}
      variant="outlined"
      onClick={handlePlatformSelect}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'none',
          zIndex: 999,
        }}
      />

      <Typography
        variant="h6"
        color="primary"
        style={{ cursor: 'pointer', position: 'absolute', top: 0, left: 0, padding: '8px' }}
        fontWeight="bold"
      >
        {platform.name}
      </Typography>
      <DomainImage src={platform.imageUrl} alt={platform.name} />
    </Paper>
  );
};
