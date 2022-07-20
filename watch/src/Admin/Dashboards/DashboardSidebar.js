import '../adminHome.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom'
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import WatchIcon from '@mui/icons-material/Watch';


export const DashboardSidebar = (props) => {
  // const [dashBoard, setDashBoard] = useState(true);
  // const [customer, setCustomer] = useState(false);
  // const [product, setProduct] = useState(false);
  // const [account, setAccount] = useState(false);
  // const [order, setOrder] = useState(false);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });


  // const dashBoardActive = () => {
  //   setDashBoard(true);
  //   setCustomer(false);
  //   setProduct(false);
  //   setAccount(false);
  //   setOrder(false);
  // };
  //
  // const customerActive = () => {
  //   setCustomer(true);
  //   setDashBoard(false);
  //   setProduct(false);
  //   setOrder(false);
  //   setAccount(false);
  // };
  //
  // const productActive = () => {
  //   setProduct(true);
  //   setDashBoard(false);
  //   setCustomer(false);
  //   setAccount(false);
  //   setOrder(false);
  // };
  //
  // const accountActive = () => {
  //   setAccount(true);
  //   setDashBoard(false);
  //   setCustomer(false);
  //   setProduct(false);
  //   setOrder(false);
  // };
  //
  // const orderActive = () => {
  //   setOrder(true);
  //   setDashBoard(false);
  //   setCustomer(false);
  //   setProduct(false);
  //   setAccount(false);
  // }
  
  const items = [
    {
      href: '/admin',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Thống kê',
    },
    {
      href: '/admin/customer',
      icon: (<UsersIcon fontSize="small" />),
      title: 'Khách Hàng',
    },
    {
      href: '/admin/product',
      icon: (<WatchIcon sx={{fontWeight: 'bold'}} fontSize="small" />),
      title: 'Sản Phẩm',
    },
    {
      href: '/admin/order',
      icon: (<ShoppingCartCheckoutIcon sx={{ fontWeight: 'bold'}} fontSize="small" />),
      title: 'Đơn hàng',
    },
    {
      href: '/admin/account',
      icon: (<UserIcon fontSize="small" />),
      title: 'Tài Khoản',
    }
  ];


 

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          
          <Box sx={{ px: 2 }}>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <div className='wrapperItemsSideBar'>
          {items.map((item) => (
            <Link
            onClick={item.fun} 
            className={item.class ? 'itemSideBarActive' : 'linkItemSideBar'}
              key={item.title}
              to={item.href}
            >
              {item.icon} {item.title}
            </Link>
          ))}
          </div>
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Trang quản trị website
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Chúng tôi là Curnon
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img style={{backgroundColor: 'white'}}
              alt="Go to pro"
              src="https://curnonwatch.com/_next/static/media/logo.cc5d661a.svg"
            />
          </Box>
          <Link
            to="/"
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Go to Website!
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
