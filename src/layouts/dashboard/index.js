import { Outlet } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(() => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%'
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <RootStyle>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
