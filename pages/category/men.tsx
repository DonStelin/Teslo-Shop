import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ProductList } from '@components/products';
import { ShopLayout } from '@components/layouts';
import { useProducts } from '@hooks';
import { FullScreenLoading } from '@components/ui';

const WomenPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title="Teslo Shop - Men"
      pageDescription="Men's Designer Clothing"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Men&apos;s Designer Clothing
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
