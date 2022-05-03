// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import { CarouselThumbnail } from '../../carousel';
//
import { MotionInView, varFadeInUp, varFadeInDown } from '../../animate';
// utils
import { mockImgProduct } from '../../../utils/mockImages';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.grey[100]
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function LandingBathtub() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12}>
            <MotionInView variants={varFadeInUp}>
              <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
                BATHTUB
              </Typography>
            </MotionInView>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CarouselThumbnail images={mockImgProduct} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
