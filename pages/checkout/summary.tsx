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

const SummaryPage = () => {
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
              <Typography variant="h2">Summary (3 items)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1"> Delivery address </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography> Mr.WorldWide </Typography>
              <Typography>243 ave </Typography>
              <Typography>243 HYA 23S </Typography>
              <Typography>Narnia </Typography>
              <Typography>+1 232325816 </Typography>
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
