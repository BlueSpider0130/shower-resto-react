import React, { useEffect, useState } from 'react';
// material
import { Container, Grid, Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { BookSummary, BillingInfo, PaymentForm } from '../components/confirm';
// import { useSelector } from '../redux/store';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));
export default function PageConfirm() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [formLoaded, setFormLoaded] = useState(false);

  // const { isLoading } = useSelector((state) => state.client);
  // console.log(isLoading);

  useEffect(() => {
    const Square = document.createElement('script');
    Square.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    Square.type = 'text/javascript';
    Square.async = false;
    Square.onload = () => {
      setFormLoaded(true);
    };
    document.getElementsByTagName('head')[0].appendChild(Square);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Payment">
      <RootStyle title="Page Four | Minimal-UI">
        <Container>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph>
              Let's finish powering you up!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Professional plan is right for you.
            </Typography>
          </Box>
          <Grid container spacing={upMd ? 3 : 5}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 5,
                  p: { md: 5 },
                  borderRadius: 2,
                  border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }
                }}
              >
                <BillingInfo />
                {formLoaded && <PaymentForm paymentForm={window.Square} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <BookSummary />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
