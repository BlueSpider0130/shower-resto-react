import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
  isOffset: PropTypes.bool
};

export default function Logo({ sx, isOffset }) {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box
      src={isOffset ? '/static/icons/logo/shower-logo-txt.png' : '/static/icons/logo/shower-logo-txt-white.png'}
      sx={{ width: 256, height: 80, ...sx }}
      component="img"
    />
  );
}
