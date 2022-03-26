import { Grid, Typography } from '@mui/material';
import React from 'react';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Total Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>$3792</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>$568</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Order total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
        <Typography variant="subtitle1">$4360</Typography>
      </Grid>
    </Grid>
  );
};
