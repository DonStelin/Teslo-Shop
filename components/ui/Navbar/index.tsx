import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { toggleSideMenu } from '@store/uiSlice';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Input,
  InputAdornment,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartCheckoutOutlined,
} from '@mui/icons-material';
import { useAppDispatch } from '@store/hooks';
import { useAppSelector } from '../../../store/hooks';

export const Navbar = () => {
  const numberOfItems = useAppSelector(({ cart }) => cart.numberOfItems);
  const { asPath, push } = useRouter();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm.toLocaleLowerCase()}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button
                color={asPath === '/category/men' ? 'primary' : 'info'}
                className="navbar-button"
              >
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                className="navbar-button"
                color={asPath === '/category/women' ? 'primary' : 'info'}
              >
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button
                className="navbar-button"
                color={asPath === '/category/kids' ? 'primary' : 'info'}
              >
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            autoFocus
            className="fadeIn"
            value={searchTerm}
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className="fadeIn"
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => dispatch(toggleSideMenu())}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartCheckoutOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={() => dispatch(toggleSideMenu())}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
