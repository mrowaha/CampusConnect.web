import React from 'react';
import {
    FormControl,
    Container,

} from "@mui/material";
import { PageTitle,
         } from '@/components/shared';

import {
    Button,
    Stack,
    useTheme,
    Grid,
    MenuItem,
    Select ,

} from '@mui/material';
import { ProductCard } from '@/components/market';
import ProfilePageLayout from "@/layouts/profile";



export default function ProductsPage() {
    const theme = useTheme();
    const [selectedDropDown, setSelectedDropDown] = React.useState<boolean>('');

    const handleDropDownChange = (event) => {
        setSelectedDropDown(event.target.value);
    };

    const [isRentSelected, setRentSelected] = React.useState<boolean>(true); // by default in lost forum
    const [isSellSelected, setSellSelected] = React.useState(false);

    const handleSell = () => {
        setSellSelected(!isSellSelected);
        setRentSelected(!isRentSelected);
    };
    
    const handleRent = () => {
        setSellSelected(!isSellSelected);
        setRentSelected(!isRentSelected);
    };
    // Example data for products
  const products = React.useMemo(() => ([
    { 
      id: 1, 
      name: 'Basys 3 Board', 
      price: 19.99, 
      imageUrl: '/product1-img.svg',
      tags: ["Electronics", "Gadgets"],  
      isFavorite : true , 
      isAdded : true 
    },
    { 
      id: 2, 
      name: 'Iphone 11', 
      price: 19.99, 
      imageUrl: '/product2-img.svg',
      tags: ["Electronics", "Gadgets"],  
      isFavorite : true , 
      isAdded : true 
    },
  ]), []);
    
    return (
        <Container >
            <div>
                <PageTitle pageTitle = {"Products"}/>
                {/* Forum Buttons and Add Post Button */}
        <Grid container  alignItems="center">
        
        <Grid item xs={1}>
          <Button
            size="medium"
            variant="outlined"
            onClick={handleSell}
            sx={{
              backgroundColor: isRentSelected ? theme.palette.primary.main : 'transparent',
              color: isRentSelected ? '#ffffff' : theme.palette.primary.main,
            }}
          >
            Sell
          </Button>
        </Grid>
        <Grid item xs={9}  justifyContent="flex-start">
          <Button
            size="medium"
            variant="outlined"
            onClick={handleRent}
            sx={{
              backgroundColor: isSellSelected ? theme.palette.primary.main : 'transparent',
              color: isSellSelected ? '#ffffff' : theme.palette.primary.main,
            }}
          >
            Rent
          </Button>
          {/* Drop down menu */}
        </Grid>
        <Grid item xs={1} justifyContent="flex-end" >
            <FormControl>
                <Select
                    value={selectedDropDown}
                    onChange={handleDropDownChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select an option' }}
                >
                    <MenuItem value="" disabled>
                    Select an option
                    </MenuItem>
                    <MenuItem value="option1">All</MenuItem>
                    <MenuItem value="option2">Rented</MenuItem>
                    <MenuItem value="option3">Listed</MenuItem>
                    <MenuItem value="option4">Hidden</MenuItem>
                </Select>
        </FormControl>
        </Grid>
      </Grid>
                
            </div>
        {/* horizontal margin */}
        <div 
            style={{
            width: "100%",
            height : 100
            }}
        />

        {/* PRODUCT LISTINGS */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* horizontal margin */}
        <div 
            style={{
            width: "100%",
            height : 100
            }}
        />

        </Container>

    );
};

ProductsPage.getLayout = (page : React.ReactNode) => {
  return <ProfilePageLayout>{page}</ProfilePageLayout>
}

export async function getStaticProps() {
  return {
    props : {
      protected : false
    }
  }
}