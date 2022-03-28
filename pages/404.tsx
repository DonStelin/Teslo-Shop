import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout
      title={'Teslo Shop - Page not found'}
      pageDescription={"Oops we didn't find what you were looking for"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404 |
        </Typography>

        <Typography marginLeft={2}>
          Oops we didn&apos;t find what you were looking for
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
