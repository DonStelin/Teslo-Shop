import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { ShopLayout } from '@components/layouts';
import { countries } from '@utils';
import { shippingAddress } from '@interfaces';
import { useCart } from '@hooks';

const AddressPage = () => {
  const { getAddressFromCookies, updateUserAddress } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<shippingAddress>({
    defaultValues: getAddressFromCookies(),
    mode: 'onBlur',
  });

  const router = useRouter();

  const onSubmit = (data: shippingAddress) => {
    updateUserAddress(data);

    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title="Address" pageDescription="Set destination address">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'This field must have at least 3 characters',
                },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'This field must have at least 3 characters',
                },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 1"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'This field must have at least 3 characters',
                },
              })}
              error={!!errors.address}
              helperText={errors.address && errors.address.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 2"
              variant="filled"
              fullWidth
              {...register('address2')}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip / Postal Code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'This field is required',
              })}
              error={!!errors.zip}
              helperText={errors.zip && errors.zip.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'This field is required',
              })}
              error={!!errors.city}
              helperText={errors.city && errors.city.message}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              variant="filled"
              fullWidth
              {...register('country', {
                required: 'This field is required',
              })}
              error={!!errors.country}
              helperText={errors.country && errors.country.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is required',
              })}
            ></TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Checkout
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
