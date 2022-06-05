import { GetServerSideProps, NextPage } from 'next';
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
import { CartList, OrderSummary } from '@components/cart';
import { ShopLayout } from '@components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@database';
import { IOrder } from '@interfaces';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
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

  const { firstName, lastName, address, address2, city, phone, country, zip } =
    shippingAddress;

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
                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Paid"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pay</h1>
                )}
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
