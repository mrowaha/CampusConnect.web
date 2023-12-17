import React, { useEffect, useState } from 'react';
import { Paper, Radio, RadioGroup, Rating, Button, Grid, Skeleton, Box, Checkbox, FormControlLabel, Divider, TextField,Typography, Container, useTheme, IconButton } from '@mui/material';
import { PageTitle } from '@/components/shared/PageTitle';
import { PlatformCard } from '@/components/market/PlatformCard';
import { BACKEND_URL, SEARCH_PRODUCT } from "@/routes";
import { useRouter } from 'next/router';
import { useSnackbar } from '@/store/snackbar';
import SearchIcon from '@mui/icons-material/Search';
import { Select, MenuItem } from '@mui/material';
import Option from '@mui/joy/Option';
import { ProductCard, TagCard, TrendingChip}  from "@/components/market";
import { useAtom } from "jotai";
import {currentUserAtom} from "@/auth";

export default function Search() {
    const theme = useTheme();
    const router = useRouter();
    const snackbar = useSnackbar();
    const [productList, setProductList] = useState([])
    const [searchParams, setSearchParams] = useState(null)
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sellerRating, setSellerRating] = useState('');

    const [loggedInUser, setLoggedInUser] = useAtom(currentUserAtom);

    useEffect(() => {
        if (sellerRating!= '') {
            handleSearch({sellerRating:sellerRating})
        }
      }, [sellerRating]);
  
    useEffect(() => {
      if (router.isReady) {

        setSearchParams({
            keywords: router.query.keywords || '',
            tags: router.query.tags ? router.query.tags.split(',') : [],
            minPrice: router.query.minPrice || null,
            maxPrice: router.query.maxPrice || null,
            sortBy: router.query.sortBy || '',
            sellerRating: router.query.sellerRating || null
          });

          setMinPrice(router.query.minPrice || '');
          setMaxPrice(router.query.maxPrice || '');
  
        console.log(searchParams);
      }
    }, [router.isReady, router.query]); // Depend on `router.isReady` and `router.query`

    useEffect(() => {

        const fetchData = async () => {
          try {

            const response = await fetch(`${BACKEND_URL}${SEARCH_PRODUCT}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(createSearchBody())
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            const products = mapDataToProducts(data, loggedInUser? loggedInUser.uuid : "0");

            console.log("products", products)
            setProductList(products);

            snackbar("success", "Search Completed Successfully");
          } catch (err) {
            snackbar("error", err.message || 'An error occurred');
          }
        };
        fetchData();
      }, [searchParams]);
      

      const mapDataToProducts = (data, loggedInUserId) => {
        return data.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: '/product1-img.svg', // Replace with actual image path or logic
          tags: item.tags,
          viewCount: item.viewCount,
          sellerRating: item.seller.trustScore,
          isFavorite: item.wishListedBy.some(wishlistItem => wishlistItem.userId === loggedInUserId),
          isAdded: true, // Adjust this based on your logic
        }));
      };


    const createSearchBody = () => {
        const body = {};

        if (searchParams.keywords && searchParams.keywords.trim() !== '') {
        body.keywords = searchParams.keywords;
        }

        if (searchParams.tags && searchParams.tags.length > 0) {
        body.tags = searchParams.tags;
        }

        if (searchParams.minPrice != null && searchParams.minPrice !== '') {
        body.minPrice = searchParams.minPrice;
        }

        if (searchParams.maxPrice != null && searchParams.maxPrice !== '') {
        body.maxPrice = searchParams.maxPrice;
        }

        if (searchParams.sortBy && searchParams.sortBy.trim() !== '') {
        body.sortBy = searchParams.sortBy;
        }

        if (searchParams.sellerRating != null && searchParams.sellerRating !== '') {
        body.sellerRating = searchParams.sellerRating;
        }

        return body;
    };
      
  
    const handleSearch = (updatedParams) => {
        const currentParams = {
            keywords: router.query.keywords || '',
            tags: router.query.tags ? router.query.tags.split(',') : [],
            minPrice: router.query.minPrice || '',
            maxPrice: router.query.maxPrice || '',
            sortBy: router.query.sortBy || '',
            sellerRating: router.query.sellerRating || ''
        };
        
    
        // Merge current parameters with updated ones
        const finalParams = { ...currentParams, ...updatedParams };
        console.log("finalParams", finalParams)
        const queryParams = new URLSearchParams();
    
        Object.entries(finalParams).forEach(([key, value]) => {
            if (value || value === 0) {
                if (Array.isArray(value) && value.length) {
                    // Join the array into a single string and append
                    queryParams.set(key, value.join(','));
                } else {
                    queryParams.set(key, value);
                }
            }
        });
    
        router.push(`/search?${queryParams.toString()}`);
    };
    

    const onFilterChange = () => {
        let newSearchParams = {}
        
        if (minPrice !== '') {
            newSearchParams.minPrice= parseFloat(minPrice) 
        };
        if (maxPrice !== '') {
            newSearchParams.maxPrice= parseFloat(maxPrice) 
        };
    
        setSearchParams(newSearchParams);
        handleSearch(newSearchParams);
    };

    const onTagRemove = (tag) => {
        let newTags = searchParams.tags.filter(t => t !== tag);
        // setSearchParams({...searchParams, tags: newTags });
        
        // handleSearch(newTags.split(','));
        handleSearch({tags:newTags});
    };

    const handleCheckboxClick = (event, tag) => {
        let newTags;

        if (searchParams.tags.length === 0) {
            // List of all tags
            const allTags = ["Purchase", "Borrowable", "Rentable", "Donation"];
    
            // Add all other tags except the one clicked
            newTags = allTags.filter(t => t !== tag);
        } else {
            if (event.target.checked) {
                // Add the tag to the list if it's checked
                newTags = [...searchParams.tags, tag];
            } else {
                // Remove the tag from the list if it's unchecked
                newTags = searchParams.tags.filter(t => t !== tag);
            }
        }
    
        // Set the new tags to searchParams
        // setSearchParams({...searchParams, tags: newTags });
        console.log("newTags", newTags)
        handleSearch({tags:newTags});
    };

    const sortChanged = (event) => {
        // const updatedParams = { ...searchParams, sortBy: event.target.value };
        handleSearch({sortBy: event.target.value })
        // setSearchParams()
    };

  return (
    <> 
    {(searchParams != null && (<Container>

        <PageTitle 
        pageTitle={searchParams && searchParams.keywords ? `Search Results for '${searchParams.keywords}'` : "Search Results"} 
        disableUppercase 
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Select
                    defaultValue=""
                    displayEmpty
                    onChange={sortChanged}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="" disabled>Sort By</MenuItem>
                    <MenuItem value="LATEST">Latest</MenuItem>
                    <MenuItem value="PRICE_DESCENDING">Highest Price</MenuItem>
                    <MenuItem value="PRICE_ASCENDING">Lowest Price</MenuItem>
                    <MenuItem value="TRENDING">Trending</MenuItem>
                </Select>
                </Box>
      {/* Platform LISTINGS */}
      <Grid container spacing={2} style={{ marginTop: "5px"}}>

        

        {/* Left Param Grid */}

            <Grid item xs={3.5} style={{ 
                height: "75vh", 
                overflowY: "auto", 
                borderRadius: "20px",
                border: `2px solid ${theme.palette.primary.light}`
                }}>
                <Typography color="primary" variant="h6" style={{ marginBottom: theme.spacing(2) }}>Filter</Typography>

                <FormControlLabel 
                    control={<Checkbox defaultChecked onClick={(e) => handleCheckboxClick(e, "Rentable")} />} 
                    label="Rentable" 
                />
                <FormControlLabel 
                    control={<Checkbox defaultChecked onClick={(e) => handleCheckboxClick(e, "Borrowable")} />} 
                    label="Borrowable" 
                />
                <FormControlLabel 
                    control={<Checkbox defaultChecked onClick={(e) => handleCheckboxClick(e, "Donations")} />} 
                    label="Donations" 
                />
                <FormControlLabel 
                    control={<Checkbox defaultChecked onClick={(e) => handleCheckboxClick(e, "Purchase")} />} 
                    label="Purchase" 
                />

                <Divider style={{ margin: theme.spacing(2, 0) }} />

                {(searchParams.tags != null && (<div>

                
                {searchParams.tags.map(tag => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: theme.spacing(1, 0) }}>
                    <Typography variant="body1">{tag}</Typography>
                    <Button onClick={() => onTagRemove(tag)}>X</Button>
                    </div>
                ))}

                </div>))}
                <Divider style={{ margin: theme.spacing(2, 0) }} />

                <Typography color="primary" variant="body1" style={{ marginBottom: theme.spacing(3) }}>Price Range</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField 
                        label="Min Price"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        style={{ marginRight: theme.spacing(1) }} 
                        InputLabelProps={{
                        style: { color: theme.palette.primary.main }
                        }}
                        InputProps={{
                        style: { color: theme.palette.primary.main }
                        }}
                    />
                    <TextField 
                        label="Max Price" 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ marginRight: theme.spacing(1) }} 
                        InputLabelProps={{
                        style: { color: theme.palette.primary.main }
                        }}
                        InputProps={{
                        style: { color: theme.palette.primary.main }
                        }}
                    />
                    <IconButton onClick={onFilterChange} color="primary">
                    <SearchIcon />
                    </IconButton>
                </div>

                <Divider style={{ margin: theme.spacing(2, 0) }} />

                <Typography color="primary" variant="body1" style={{ marginBottom: theme.spacing(1) }}>Minimum Seller Trust Score</Typography>
                <RadioGroup value={sellerRating} 
                        onChange={(e) => setSellerRating(e.target.value)}>
                {[5, 4, 3, 2, 1].map(score => (
                            <FormControlLabel key={score} value={score} control={<Radio />} label={<Rating readOnly value={score} />} />
                            ))}
                </RadioGroup>
            </Grid>

            <Grid item xs={8.5} style={{ 
                height: "75vh", 
                overflowY: "auto", 
            }}>
                {/* Product list Grid */}
                {productList.length > 0 ? (
                    <Grid container spacing={2}>
                        {productList.map((product) => (
                            <Grid item key={product.id} xs={12} sm={4} md={4} lg={4}>
                                <ProductCard product={product} />
                            </Grid> 
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ pt: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
                        <Typography variant="h6" color="text.secondary">
                            No products found
                        </Typography>
                    </Box>
                )}
            </Grid>

      </Grid>
    </Container>))}
    </>
  );
}