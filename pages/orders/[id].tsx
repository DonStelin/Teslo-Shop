import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CartList, OrderSummary } from '@components/cart';
import { ShopLayout } from '@components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@database';
import { IOrder } from '@interfaces';
import { tesloApi } from '@api';
import { CircularProgress } from '@mui/material';
import { useAppDispatch } from '@store/hooks';
import { setSnackbarAlert } from '@store/ui';

interface Props {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED';
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const dispatch = useAppDispatch();

  const {
    _id,
    isPaid,
    numberOfItems,
    shippingAddress,
    orderItems,
    tax,
    subTotal,
    total,
  } = order;

  const [isPaying, setIsPaying] = useState(false);

  const { firstName, lastName, address, address2, city, phone, country, zip } =
    shippingAddress;

  const router = useRouter();

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      dispatch(setSnackbarAlert({ message: 'Oops! Something', type: 'error' }));
    }
    setIsPaying(true);
    try {
      const { data } = await tesloApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: _id,
      });
      dispatch(
        setSnackbarAlert({ message: 'Payment Successful', type: 'success' })
      );
      router.reload();
    } catch (error) {
      console.log(error);
      setIsPaying(false);
      dispatch(setSnackbarAlert({ message: 'Oops! Something', type: 'error' }));
    }
  };

  return (
    <ShopLayout title="Order summary" pageDescription="Order Summary">
      <Typography variant="h1" component="h1">
        Order: {_id}
      </Typography>
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Waiting for payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({numberOfItems} {numberOfItems > 1 ? 'items' : 'item'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1"> Delivery address </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? `, ${address2}` : ''}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>{country} </Typography>
              <Typography>{phone} </Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{ numberOfItems, subTotal, total, tax }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>

                <Box
                  flexDirection="column"
                  sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
                >
                  {isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Paid"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session?.user?._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
