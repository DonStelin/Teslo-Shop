import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { CartList, OrderSummary } from '@components/cart';
import { ShopLayout } from '@components/layouts';
import { useAppSelector } from '@store/hooks';

const CartPage = () => {
  const { isLoaded, productsInCart, numberOfItems } = useAppSelector(
    (state) => state.cart
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && productsInCart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, productsInCart, router]);

  if (!isLoaded || productsInCart.length === 0) return <></>;
  return (
    <ShopLayout
      title={`Cart - ${numberOfItems} ${
        numberOfItems === 1 ? 'item' : 'items'
      }`}
      pageDescription="Your shopping cart"
    >
      <Typography variant="h1" component="h1">
        Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  href="/checkout/address"
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
