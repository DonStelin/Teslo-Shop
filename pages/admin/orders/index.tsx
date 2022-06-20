import useSWR from 'swr';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { AdminLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { IOrder, IUser } from '@interfaces';
import { currency } from '@utils';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'total', headerName: 'Total' },
  {
    field: 'isPaid',
    headerName: 'Status',

    align: 'center',
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paid" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
  },
  {
    field: 'numberOfItems',
    headerName: 'N°Products',
    align: 'center',
  },
  {
    field: 'check',
    headerName: 'View Order',

    align: 'center',
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          View Order
        </a>
      );
    },
  },
  { field: 'createdAt', headerName: 'Date', width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) {
    return (
      <AdminLayout
        title="Orders"
        subTitle="Order maintenance"
        icon={<ConfirmationNumberOutlined />}
      >
        <FullScreenLoading />
      </AdminLayout>
    );
  }

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: currency.format(order.total),
    isPaid: order.isPaid,
    numberOfItems: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Orders"
      subTitle="Order maintenance"
      icon={<ConfirmationNumberOutlined />}
    >
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
    </AdminLayout>
  );
};

export default OrdersPage;
