import faker from 'faker';
import MapGL from 'react-map-gl';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import phoneFill from '@iconify/icons-eva/phone-fill';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
//
import { MapControlPopup, MapControlMarker, MapControlScale, MapControlNavigation } from '../../map/controls';
import { mapConfig } from '../../../config';
import { varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export const ADDRESS = [
  {
    latlng: [43.59, -79.64],
    address: 'Mississauga',
    phoneNumber: faker.phone.phoneNumberFormat()
  },
  {
    latlng: [43.65, -79.34],
    address: 'Toronto',
    phoneNumber: faker.phone.phoneNumberFormat()
  },
  {
    latlng: [43.68, -79.76],
    address: 'Brampton',
    phoneNumber: faker.phone.phoneNumberFormat()
  },
  {
    latlng: [43.83, -79.08],
    address: 'Pickering',
    phoneNumber: faker.phone.phoneNumberFormat()
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none'
  }
}));

// ----------------------------------------------------------------------

export default function ContactMap() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'dark';
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 43.59,
    longitude: -79.64,
    zoom: 7
  });

  return (
    <MotionInView variants={varFadeIn}>
      <RootStyle>
        <MapGL
          {...viewport}
          onViewportChange={setViewport}
          mapStyle={`mapbox://styles/mapbox/${isLight ? 'light' : 'dark'}-v10`}
          mapboxApiAccessToken={mapConfig}
          width="100%"
          height="100%"
        >
          <MapControlScale />
          <MapControlNavigation />

          {ADDRESS.map((country) => (
            <MapControlMarker
              key={country.latlng}
              latitude={country.latlng[0]}
              longitude={country.latlng[1]}
              onClick={() => setTooltip(country)}
            />
          ))}

          {tooltip && (
            <MapControlPopup
              longitude={tooltip.latlng[1]}
              latitude={tooltip.latlng[0]}
              onClose={() => setTooltip(null)}
              sx={{
                '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
                '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' }
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Address
              </Typography>
              <Typography component="p" variant="caption">
                {tooltip.address}
              </Typography>

              <Typography component="p" variant="caption" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <Box component={Icon} icon={phoneFill} sx={{ mr: 0.5, width: 14, height: 14 }} />
                {tooltip.phoneNumber}
              </Typography>
            </MapControlPopup>
          )}
        </MapGL>
      </RootStyle>
    </MotionInView>
  );
}
