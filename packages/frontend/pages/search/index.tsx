import React from 'react';
import { Paper, Typography, Button, Grid, Chip, Container, useTheme } from '@mui/material';
import { ProductCard, TagCard, TrendingChip}  from "@/components/market";
import { DomainImage } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { PlatformCard } from '@/components/market/PlatformCard';

export default function MarketPage(){
  // platform name -> MarketPlace and lost and found Forum
  const theme = useTheme();
  
  const [currTrendingTag, setCurrTrendingTag] = React.useState(0);

  React.useEffect(() => {
    setCurrTrendingTag(0);
  }, [])

  // Example data for products

  return (
    <> 
    <Container>
      <PageTitle pageTitle = "Search Results for 'smth' " disableUppercase />
      {/* Platform LISTINGS */}
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">

      </Grid>
    </Container>
    </>
  );
}