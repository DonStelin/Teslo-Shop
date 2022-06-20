import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Grid, Typography } from '@mui/material';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { AdminLayout } from '@components/layouts';
import { SummaryTile } from '@components/admin';
import { IStatistics } from '@interfaces';
import { FullScreenLoading } from '@components/ui';

const DashboardPage = () => {
  const { data, error } = useSWR<IStatistics>('api/admin/dashboard', {
    refreshInterval: 31000,
  });
  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !error) {
    return (
      <AdminLayout
        title="Dashboard"
        subTitle="Store stats"
        icon={<DashboardOutlined />}
      >
        <FullScreenLoading />
      </AdminLayout>
    );
  }

  if (error) {
    console.log('[Stats] Error:', error);
    return <Typography> Oops! Something went wrong </Typography>;
  }

  const {
    numberOfOrders = 0,
    notPaidOrders = 0,
    paidOrders = 0,
    numberOfClients = 0,
    numberOfProducts = 0,
    productsOutOfStock = 0,
    lowInventory = 0,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Store stats"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle="Total Orders"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 45 }} />}
        />

        <SummaryTile
          title={paidOrders}
          subTitle="Paid Orders"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 45 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle="Pending Orders"
          icon={<CreditCardOutlined color="error" sx={{ fontSize: 45 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle="Number of customers"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 45 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle="Number of products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 45 }} />}
        />
        <SummaryTile
          title={productsOutOfStock}
          subTitle="Products out of stock"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 45 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle="Products in stock"
          icon={
            <ProductionQuantityLimitsOutlined
              color="error"
              sx={{ fontSize: 45 }}
            />
          }
        />
        <SummaryTile
          title={`${refreshIn}s`}
          subTitle="Refreshing in"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 45 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
