import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout/index';

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Set destination address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="First name" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last name" variant="filled" fullWidth></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address Line 1"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address Line 2"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip / Postal Code"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="country" value={1}>
              <MenuItem value={1}>Honduras</MenuItem>
              <MenuItem value={2}>Costa Rica</MenuItem>
              <MenuItem value={3}>España</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth></TextField>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Checkout
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
