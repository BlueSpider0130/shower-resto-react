// material
import { Icon } from '@iconify/react';
import medalIcon from '@iconify/icons-bx/medal';
import trophyIcon from '@iconify/icons-la/trophy';
import tagIcon from '@iconify/icons-file-icons/tag';
import trafficLightOutline from '@iconify/icons-mdi/traffic-light-outline';
import CheckIcon from '@material-ui/icons/Check';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Grid, Card, Container, Typography, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    option: 'essential',
    title: 'ESSENTIAL SHOWER RESTORATION',
    budget: '$399',
    service: [
      'tile and grout cleaning',
      'steam clean and/or power wash floor, walls and ceiling & glass wall and door',
      'removal of all silicone from tile, grout and glass and apply new silicone'
    ]
  },
  {
    option: 'deluxe',
    title: 'DELUXE SHOWER RESTORATION',
    budget: '$699',
    service: [
      'grout colour sealing',
      'colour sealing of all grout lines on walls and ceiling, custom colours available'
    ]
  },
  {
    option: 'complete',
    title: 'COMPLETE SHOWER RESTORATION',
    budget: '$899',
    service: ['re-grout shower floor', 'remove old grout and re-grout with e-proxy grout']
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 600,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(5, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    transition: 'all .4s',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      '& .MuiTypography-paragraph': {
        color: theme.palette.grey[800]
      },
      '& .MuiTypography-body1': {
        color: theme.palette.grey[800]
      },
      '.icon': {
        color: theme.palette.grey[800]
      }
    },
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: 5 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          // top: 0,
          // left: 0,
          // right: 0,
          // bottom: 0,
          // zIndex: -1,
          // content: "''",
          // margin: 'auto',
          // position: 'absolute',
          // width: 'calc(100% - 40px)',
          // height: 'calc(100% - 40px)',
          // borderRadius: theme.shape.borderRadiusMd,
          // backgroundColor: theme.palette.background.paper,
          // boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  margin: 'auto',
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main)
}));

// ----------------------------------------------------------------------

export default function LandingWalkSubscription() {
  const theme = useTheme();
  // const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 1, md: 1, lg: 1 }, display: 'flex', justifyContent: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'left' }}>
              Walk-In Shower Restoration Services
            </Typography>
          </MotionInView>
        </Box>
        <Grid container spacing={2}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item md={6} lg={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={(index === 0, 1, 2, 3 && 'cardCenter')}>
                  <Typography variant="h5" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    {card.budget}
                  </Typography>
                  <Typography variant="p" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    {index !== 0 && card.option}
                  </Typography>
                  {card.service.map((service, serviceIndex) => (
                    <Typography key={serviceIndex} variant="p" paragraph sx={{ display: 'flex', alignItems: 'top' }}>
                      <CheckIcon /> &nbsp;
                      {service}
                    </Typography>
                  ))}
                  <Button
                    size="large"
                    variant="outlined"
                    // component={RouterLink}
                    // to={PATH_DASHBOARD.root}
                    startIcon={<ArrowRightAltIcon />}
                  >
                    Book Consultation
                  </Button>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
