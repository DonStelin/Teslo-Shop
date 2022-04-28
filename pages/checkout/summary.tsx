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
} from '@mui/material';
import { CartList, OrderSummary } from '@components/cart';
import { ShopLayout } from '@components/layouts';
import { useAppSelector } from '@store/hooks';
import { countries } from '@utils';

const SummaryPage = () => {
  const { address: userAddress, numberOfItems } = useAppSelector(
    (state) => state.cart
  );

  if (!userAddress) return <></>;

  const { firstName, lastName, address, address2, city, zip, country, phone } =
    userAddress;

  const countryName = countries.find((item) => item.code === country)?.name;

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
                Summary ({numberOfItems}{' '}
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
              <Typography>{countryName} </Typography>
              <Typography>{phone} </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
