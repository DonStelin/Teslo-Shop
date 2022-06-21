import NextLink from 'next/link';
import useSWR from 'swr';
import { Box, Button, CardMedia, Chip, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { AdminLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { IProduct } from '@interfaces';
import { currency } from '@utils';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Image',
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            alt={row.title}
            className="fadeIn"
            component="img"
            image={row.img}
          ></CardMedia>
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: 'price', headerName: 'Price' },
  { field: 'inStock', headerName: 'In Stock' },
  { field: 'sizes', headerName: 'Sizes', width: 250 },
  { field: 'type', headerName: 'Type' },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) {
    return (
      <AdminLayout
        title="Products"
        subTitle="Products maintenance"
        icon={<CategoryOutlined />}
      >
        <FullScreenLoading />
      </AdminLayout>
    );
  }

  const rows = data!.map(
    ({ _id, sizes, title, inStock, price, type, images, slug }) => ({
      id: _id,
      img: images[0],
      inStock,
      price: currency.format(price),
      sizes: sizes.join(', '),
      title,
      type: type.charAt(0).toUpperCase() + type.slice(1),
      slug,
    })
  );

  return (
    <AdminLayout
      title="Products"
      subTitle="Products maintenance"
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Create Product
        </Button>
      </Box>
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
