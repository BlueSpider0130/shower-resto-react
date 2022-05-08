// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Link, Divider, Container, Typography, Box } from '@material-ui/core';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            {/* <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink> */}

            <Typography variant="caption" component="p">
              © 2022 Best shower mould removal service Toronto, Shower restoration Toronto, Shower regrout, Bath and
              shower cleaning Specialists, Complete Shower Restoration. Site by Spaz Media
              <br /> made by &nbsp;
              <Link href="https://freelancer.com/u/sashasavrasova">Oleksandra</Link>
            </Typography>
          </Container>
        </Box>
      </Container>
    </RootStyle>
  );
}
