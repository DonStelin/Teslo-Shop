import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ErrorOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '@components/layouts';
import { tesloApi } from '@api';
import { validations } from '@utils';
import { useAuth } from '@hooks';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const { registerUser } = useAuth();

  const required = 'All fields are required';
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser({ name, email, password });

    if (hasError) {
      setErrorMessage(message!);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
              </Typography>
              <Chip
                label="Invalid credentials"
                color="error"
                icon={<ErrorOutlined />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="filled"
                fullWidth
                {...register('name', {
                  required,
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                autoComplete="username"
                variant="filled"
                fullWidth
                {...register('email', {
                  required,
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                autoComplete="new-password"
                fullWidth
                {...register('password', {
                  required,
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                autoComplete="new-password"
                type="password"
                variant="filled"
                fullWidth
                {...register('passwordConfirm', {
                  required,
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match',
                })}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">Already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
