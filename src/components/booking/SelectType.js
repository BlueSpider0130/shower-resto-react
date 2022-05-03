import PropTypes from 'prop-types';
import { alpha, makeStyles, withStyles, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import showerIcon from '@iconify/icons-emojione-monotone/shower';
import bathtubLight from '@iconify/icons-ph/bathtub-light';
import arrowBoth24 from '@iconify/icons-octicon/arrow-both-24';
import quicktilesIcon from '@iconify/icons-arcticons/quicktiles';
import { Box, Grid, Paper, Radio, RadioGroup, CardActionArea, FormControlLabel, Typography } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
import { varFadeIn, varWrapEnter, varFadeInRight, TextAnimate, MotionInView } from '../animate';

// ----------------------------------------------------------------------
const StyledIcon = styled(Icon)({
  fontSize: '50px',
  border: '1px solid #000000',
  margin: '10px',
  cursor: 'pointer'
});

SelectTypeForm.propTypes = {
  onNext: PropTypes.func
};

export default function SelectTypeForm({ onNext }) {
  const { themeColor, onChangeColor, colorOption } = useSettings();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}
      variants={varFadeInRight}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StyledIcon icon={showerIcon} onClick={() => onNext('stand-up')} />
        <Typography>Stand Up Shower</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StyledIcon icon={bathtubLight} onClick={() => onNext('bathtub')} />
        <Typography>Bathtub Shower</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StyledIcon icon={quicktilesIcon} onClick={() => onNext('floor')} />
        <Typography>Bathroom Floor</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StyledIcon icon={arrowBoth24} onClick={() => onNext('multiple')} />
        <Typography>Multiple Showers or Bathrooms</Typography>
      </Box>
    </Box>
  );
}
