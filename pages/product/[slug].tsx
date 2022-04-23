import { useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '@components/layouts';
import { ItemCounter } from '@components/ui';
import { dbProducts } from '@database';
import { ProductSlideShow, SizeSelector } from '@components/products';
import { ICardProduct, IProduct, ISize } from '@interfaces';
import { useCart } from '@hooks';

interface Props {
  product: IProduct;
}

const Slug: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [tempCartProduct, setTempCartProduct] = useState<ICardProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    quantity: 1,
    gender: product.gender,
  });

  const changeSize = (size: ISize) =>
    setTempCartProduct((val) => ({ ...val, size }));

  const onUpdateQuantity = (value: number) =>
    setTempCartProduct((val) => ({ ...val, quantity: value }));

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock > 3 ? 3 : product.inStock}
                updateValue={onUpdateQuantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSizeChange={changeSize}
              />
            </Box>

            {/* Add to cart */}

            {!!product.inStock ? (
              <Button
                color="secondary"
                className="circular-btn"
                variant={tempCartProduct.size ? 'contained' : 'outlined'}
                onClick={onAddProduct}
              >
                {tempCartProduct.size ? 'Add to cart' : 'Select size'}
              </Button>
            ) : (
              <Chip
                label="Out of stock"
                color="primary"
                variant="outlined"
                sx={{ cursor: 'not-allowed' }}
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default Slug;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllSProductsSlugs();

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};
