import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '@components/layouts';

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
        <NextLink href={`/orders/${rowData.row.id}`} passHref>
          <Link underline="always">View Order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullName: 'John Doe' },
  { id: 2, paid: false, fullName: 'Jane Doe' },
  { id: 3, paid: true, fullName: 'Stelin Larios' },
  { id: 4, paid: true, fullName: 'Mr. WorldWide' },
  { id: 5, paid: false, fullName: 'Ozuna' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="Orders history" pageDescription="Client order history">
      <Typography variant="h1" component="h1">
        Order history
      </Typography>
      <Grid container>
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

export default HistoryPage;
