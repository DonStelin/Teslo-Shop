import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@store/hooks';
import { currency } from '@utils';

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const {
    numberOfItems: numberOfItemsG,
    subTotal: subTotalG,
    total: totalG,
    tax: taxG,
  } = useAppSelector(({ cart }) => cart);

  const summaryValues = orderValues || {
    numberOfItems: numberOfItemsG,
    subTotal: subTotalG,
    total: totalG,
    tax: taxG,
  };

  const { numberOfItems, subTotal, total, tax } = summaryValues;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Total Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'items' : 'item'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100} %)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Order total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
