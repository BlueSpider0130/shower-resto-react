import { useLocation, Outlet } from 'react-router-dom';
// material
// components
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
      {/* <div> */}
      <Outlet />
      {/* </div> */}
      {/* {isHome && <MainFooter />} */}
    </>
  );
}
