import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getSession } from 'next-auth/react';
import { ShopLayout } from '@components/layouts';
import { dbOrders } from '@database';
import { IOrder } from '@interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows if the order has been paid for',
    width: 200,

    renderCell: (rowData: GridValueGetterParams) => {
      return rowData.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Unpaid" variant="outlined" />
      );
    },
  },
  {
    field: 'order',
    headerName: 'View Order',
    width: 200,
    sortable: false,
    renderCell: (rowData: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${rowData.row.order}`} passHref>
          <Link underline="always">View Order</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, i) => {
    return {
      id: i + 1,
      fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      paid: order.isPaid,
      order: order._id,
    };
  });

  return (
    <ShopLayout title="Orders history" pageDescription="Client order history">
      <Typography variant="h1" component="h1">
        Order history
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick={true}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUserId(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
