// material
import { Icon } from '@iconify/react';
import medalIcon from '@iconify/icons-bx/medal';
import trophyIcon from '@iconify/icons-la/trophy';
import tagIcon from '@iconify/icons-file-icons/tag';
import trafficLightOutline from '@iconify/icons-mdi/traffic-light-outline';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: medalIcon,
    title: 'Satisfaction Guaranteed',
    description:
      'Your satisfaction is guaranteed or your money refunded.  Our highly trained professionals take pride in their work and ensure that you are satisfied. Customer service is our first priority. No deposit is required and you only pay when you’re satisfied with our work! We also have a 1 year warranty on all of our services!'
  },
  {
    icon: trophyIcon,
    title: 'Free Estimates',
    description:
      'At Complete Shower Restoration, we pride ourselves with the ability to get you a timely estimate which includes our proprietary, proven products. Just fill out our contact form and we will respond within 12-24 hours. If you have a RUSH job, please let us know and we will do our very best to see that your time frame is met. We are currently booking within 5 DAYS.'
  },
  {
    icon: tagIcon,
    title: 'Great Low Prices',
    description:
      'We are so confident in our process that we will match or beat any competitor’s estimate (for same service only, does not apply to package quotes). No one beats us for price and quality!'
  },
  {
    icon: trafficLightOutline,
    title: 'Minimal Downtime',
    description:
      'Most of our jobs are completed within 4-6 hours, leaving your tile like new. Most showers can be used the night of the appointment day!'
  }
];

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
    textAlign: 'center',
    padding: theme.spacing(5, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    transition: 'all .4s',
    '&:hover': {
      backgroundColor: theme.palette.grey[900],
      '& .MuiTypography-paragraph': {
        color: theme.palette.grey[100]
      },
      '& .MuiTypography-body1': {
        color: theme.palette.grey[400]
      },
      '.icon': {
        color: theme.palette.grey[400]
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
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

// ----------------------------------------------------------------------

export default function LandingShowerHelps() {
  // const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        <Grid container>
          <Grid item xs={12} md={12} lg={4}>
            <Box sx={{ mb: { xs: 1, md: 1, lg: 25 } }}>
              <MotionInView variants={varFadeInDown}>
                <Typography variant="h3" sx={{ textAlign: 'left' }}>
                  Why Choose
                </Typography>
                <Typography variant="h2" sx={{ textAlign: 'left' }}>
                  Complete
                  <br /> Shower Restoration
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid container item lg={8} spacing={2}>
            {CARDS.map((card, index) => (
              <Grid key={card.title} item md={6} lg={6}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle className={(index === 0, 1, 2, 3 && 'cardLeft') || (index === 1 && 'cardCenter')}>
                    <Icon icon={card.icon} className="icon" style={{ fontSize: '60px' }} />
                    <Typography variant="h5" paragraph>
                      {card.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
                  </CardStyle>
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
