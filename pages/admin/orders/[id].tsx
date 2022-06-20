import { GetServerSideProps, NextPage } from 'next';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import {
  ConfirmationNumberOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import { CartList, OrderSummary } from '@components/cart';
import { AdminLayout } from '@components/layouts';
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
    <AdminLayout
      title="Order summary"
      subTitle={`Order id: ${_id}`}
      icon={<ConfirmationNumberOutlined />}
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
                <Box flexDirection="column">
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
                      icon={<CreditScoreOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
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
