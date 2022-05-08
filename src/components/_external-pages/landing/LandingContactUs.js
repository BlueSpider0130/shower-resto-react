// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
//
import { ContactForm, ContactMap } from '../contact';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.grey[900]
}));

// ----------------------------------------------------------------------

export default function LandingContactUs() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt="image shape"
          src="/static/home/shape.svg"
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            my: 'auto',
            position: 'absolute',
            filter: 'grayscale(1) opacity(48%)',
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={12}>
            <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Complete Shower Restoration Co.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              10872148 Canada Incorporated 15 Vicora Linkway Unit 503 Toronto, ON M3C 1A7 Canada
            </Typography>
            <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Tel 647-871-SHWR (7497)
            </Typography>
            <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Email
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>quote@completeshowerrestoration.ca</Typography>
            <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Hours
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Monday – Saturday 8:00 am – 8:00 pm</Typography>
            <Typography variant="h2" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Service Areas
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Toronto, Mississauga, Newmarket, Brampton, Scarborough, Pickering, Oshawa and more!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactMap />
          </Grid>

          {/* <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
            <MotionInView threshold={0.5} variants={varFadeInUp}>
              <img alt="light mode" src="/static/home/lightmode.png" />
            </MotionInView>
            <MotionInView threshold={0.5} variants={varFadeInDown} sx={{ top: 0, left: 0, position: 'absolute' }}>
              <img alt="dark mode" src="/static/home/darkmode.png" />
            </MotionInView>
          </Grid> */}
        </Grid>
      </Container>
    </RootStyle>
  );
}
