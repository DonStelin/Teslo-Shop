import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from '@mui/material';
import { CartList, OrderSummary } from '@components/cart';
import { ShopLayout } from '@components/layouts';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { createOrder } from '@store/slices/cart';
import Cookies from 'js-cookie';

const SummaryPage = () => {
  const router = useRouter();

  const { address: userAddress, numberOfItems } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  const createOrderHandler = async () => {
    setIsPosting(true);
    dispatch(createOrder(setErrorMessage, setIsPosting, router));
  };

  if (!userAddress) return <></>;

  const { firstName, lastName, address, address2, city, zip, country, phone } =
    userAddress;

  return (
    <ShopLayout title="Summary" pageDescription="Order Summary">
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({numberOfItems}
                {numberOfItems === 1 ? 'item' : 'items'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1"> Delivery address </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography> {`${firstName} ${lastName}`} </Typography>
              <Typography>
                {address} {address2 && `, ${address2}`}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>{country} </Typography>
              <Typography>{phone} </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={createOrderHandler}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', marginTop: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
