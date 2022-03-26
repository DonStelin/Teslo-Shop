import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayout } from '@components/layouts';

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Cart Empty"
      pageDescription="There are no items in the shopping cart"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Your cart is empty</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="secondary">
              Continue shopping
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
