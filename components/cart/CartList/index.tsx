import { FC } from 'react';
import NextLink from 'next/link';
import { initialData } from '../../../database/doomyData';
import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { ItemCounter } from '@components/ui';
import { Button } from '@mui/material';

const productsInCart = [
  initialData.products[0],
  initialData.products[3],
  initialData.products[5],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1, pr: 2 }} key={product.slug}>
          <Grid item xs={3}>
            {/* Todo: Redirect to product page */}
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>M</strong>
                {/* Todo: Conditional  */}
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h4">3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {/* Editable */}

            {editable && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
