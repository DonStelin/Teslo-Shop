import type { NextPage } from 'next';
import { initialData } from '@database';
import { ProductList } from '@components/products';
import { ShopLayout } from '@components/layouts';
import { Typography } from '@mui/material';

const Home: NextPage = () => {
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
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;
