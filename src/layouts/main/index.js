import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet, NavLink as RouterLink } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {isHome && <MainNavbar />}
      <Outlet />

      {isHome && <MainFooter />}
    </>
  );
}
