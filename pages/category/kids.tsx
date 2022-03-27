import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ProductList } from '@components/products';
import { ShopLayout } from '@components/layouts';
import { useProducts } from '@hooks';
import { FullScreenLoading } from '@components/ui';

const KidsPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title="Teslo Shop - Kids"
      pageDescription="Kid's Designer Clothing"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Kid&apos;s Designer Clothing
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsPage;
