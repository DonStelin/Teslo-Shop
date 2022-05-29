import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList } from '@components/products';
import { ShopLayout } from '@components/layouts';
import { useProducts } from '@hooks';
import { FullScreenLoading } from '@components/ui';

const HomePage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="Teslo Shop - Home"
      pageDescription="Find the best Teslo products"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
