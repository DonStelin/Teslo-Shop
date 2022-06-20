import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { PeopleOutlined } from '@mui/icons-material';
import { AdminLayout } from '@components/layouts';
import { Grid, MenuItem, Select } from '@mui/material';
import { FullScreenLoading } from '@components/ui';
import { IUser } from '@interfaces';
import { tesloApi } from '@api';
import { useAppDispatch } from '@store/hooks';
import { setSnackbarAlert } from '@store/ui';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { data, error } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return (
      <AdminLayout
        title="Users"
        subTitle="User Management"
        icon={<PeopleOutlined />}
      >
        <FullScreenLoading />
      </AdminLayout>
    );
  }
  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = [...users];

    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }));
    setUsers(updatedUsers);
    try {
      await tesloApi.put('/admin/users', { userId, role: newRole });
      dispatch(
        setSnackbarAlert({
          message: 'Role updated successfully',
          type: 'success',
        })
      );
    } catch (error) {
      console.log(error);
      setUsers(previousUsers);
      dispatch(
        setSnackbarAlert({ message: 'Error updating user', type: 'error' })
      );
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 250 },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: '300px' }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map(({ _id, email, name, role }) => ({
    id: _id,
    email,
    name,
    role,
  }));

  return (
    <AdminLayout
      title={'Users'}
      subTitle={'User Management'}
      icon={<PeopleOutlined />}
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

export default UsersPage;
