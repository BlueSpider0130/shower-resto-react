import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Box, Container, Typography, Stack } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varWrapEnter, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroImgStyle = styled(motion.video)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  // margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
    height: '100vh'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} /> */}

        <HeroImgStyle alt="hero" autoPlay muted loop src="/static/home/hero.mp4" />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h2" sx={{ color: 'common.white' }}>
                Restoring Your Shower <br />
                Without Damaging <br /> Your Wallet!
                {/* <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;Minimal
                </Typography> */}
              </Typography>
            </motion.div>

            {/* <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                The starting point for your next project based on easy-to-customize Material-UI © helps you build apps
                faster and better.
              </Typography>
            </motion.div> */}

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Book now
              </Button>
            </motion.div>

            {/* <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_sketch.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_figma.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_material.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_react.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_js.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_ts.svg" />
            </Stack> */}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
