// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Stack } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import RoomIcon from '@material-ui/icons/Room';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function BillingInfo() {
  // const { getFieldProps, isSubmitting } = formik;

  return (
    <RootStyle>
      <Typography variant="subtitle1">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBoxIcon />
          &nbsp;Vadim Postnicov
        </Typography>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <DraftsIcon />
          &nbsp;topwebdev.0612@gmail.com
        </Typography>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <PermPhoneMsgIcon />
          &nbsp;9801659323
        </Typography>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <RoomIcon />
          &nbsp;98012
        </Typography>
      </Stack>
    </RootStyle>
  );
}
