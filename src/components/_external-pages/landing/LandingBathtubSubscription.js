// material
import CheckIcon from '@material-ui/icons/Check';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Grid, Card, Container, Typography } from '@material-ui/core';
//

import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    option: 'essential',
    title: 'ESSENTIAL SHOWER RESTORATION',
    budget: '$349',
    service: [
      'tile and grout cleaning',
      'steam clean and/or power wash floor, walls',
      'removal of all silicone from tile, grout and apply new silicone'
    ]
  },
  {
    option: 'complete',
    title: 'COMPLETE SHOWER RESTORATION',
    budget: '$499',
    service: ['grout colour sealing', 'colour sealing of all grout lines on walls, custom colours available']
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

// ----------------------------------------------------------------------

export default function BathtubSubscription() {
  // const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 1, md: 1, lg: 1 }, display: 'flex', justifyContent: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'left' }}>
              Bathtub Shower Restoration Services
            </Typography>
          </MotionInView>
        </Box>
        <Grid container spacing={2}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item md={6} lg={6}>
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
        <Box sx={{ mt: { xs: 1, md: 1, lg: 10 }, display: 'flex', justifyContent: 'center' }}>
          <Grid container>
            <Grid item md={6} lg={6}>
              <CardStyle>
                <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  Grout Colour Sealing
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  ColorClad Grout Colour system is a grout restoration process that not only brings back the uniform
                  colour of a freshly installed tile grout, but dramatically improves the performance of any grout, new
                  or old.
                  <br />
                  <br /> ColorClad uses a core color system that offers a near infinite palette of colors to create the
                  perfect look to your tiled surfaces. To keep the grout looking its best, ColorClad uses fluoropolymers
                  for soil release and aluminum oxide for durability. No other grout sealer on the market offers this
                  combination of technology or performance. <br />
                  <br /> ColorClad starts the project with a clean slate and then allows you to maintain your grout with
                  less aggressive, more ecologically friendly chemicals & procedures.
                  <br /> <br />
                  Learn more about the product we use by clicking below:
                  <br />
                  <br />
                </Typography>
                <Button
                  size="large"
                  variant="contained"
                  // onClick={serveTest}
                  // component={RouterLink}
                  // to={PATH_DASHBOARD.root}
                  startIcon={<ArrowRightAltIcon />}
                >
                  VISIT
                </Button>
              </CardStyle>
            </Grid>
            <Grid item md={6} lg={6}>
              <CardStyle>
                <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  Grout Colour Sealing
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  &#10242;repair damaged grout
                  <br /> &#10242;repair of any cracked grout on walls
                  <br /> &#10242;glass cleaning
                  <br /> &#10242;remove soap scum and hard water / mineral build up
                  <br /> &#10242;replace damaged tile
                  <br /> &#10242;replace damaged tiles
                  <br /> &#10242;buff and clear seal stone tiles
                  <br /> &#10242;natural stone buffing and clear sealing to protect against water damage and add shine
                  <br /> &#10242;drip rail replacement
                  <br /> &#10242;replacing plastic drip rails on side and/or
                  <br /> &#10242;bottom of glass door
                  <br /> &#10242;drywall replacement and tile re-applying
                  <br /> &#10242;replace damaged drywall and re-tile area
                </Typography>
              </CardStyle>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
