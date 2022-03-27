import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ProductList } from '@components/products';
import { ShopLayout } from '@components/layouts';
import { useProducts } from '@hooks';
import { FullScreenLoading } from '@components/ui';

const WomenPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts(
    '/products?gender=women'
  );

  console.log('Products', products);

  return (
    <ShopLayout title="Teslo Shop - Women" pageDescription="Women's clothing">
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Women&apos;s Designer Clothing
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
