// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Card, Container, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------
const CARDS = [
  {
    title: 'MOULD',
    description:
      'If mold has begun to grow in your bathroom you need to remove it immediately. All mold, even non-toxic mold, can make you sick. In fact, non-toxic mold is more likely to make you sick, because it’s so common. Mold can often be found in the shower and the bathtub. Grime from body oils and soap scum which is washed off and onto the shower or tub create a food source for mold to feed on. And of course there are abundant water sources for mold created by the running water and steam.'
  },
  {
    title: 'DISCOLOURED GROUT',
    description:
      'Prevention is the best cure and same goes for your grout lines. Grout is porous and absorbs everything from body oils to calcium in hard water. If your grout is discoloured but in good condition, there’s no need to re-grout! Grout Colour Sealing will make any dingy, old, discoloured grout brand new again! The results last years! Scroll down to find out more about Grout Colour Sealing.'
  },
  {
    title: 'CAULKING ISSUES',
    description:
      'Caulking affected by mould needs to be replaced for 100% mould removal. Caulking is vital in any shower to prevent leaks in corners. If caulking is peeling off, immediate re-caulking is necessary to prevent water damage behind tile and grout!'
  }
];
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(24, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]} 100%)`
      : 'none'
}));
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 3000,
    minHeight: 400,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(5, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    transition: 'all .4s',
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    }
    // '&.cardMould': {
    //   minHeight: 400,
    //   [theme.breakpoints.up('md')]: { marginTop: 5 }
    // }
  };
});

// ----------------------------------------------------------------------

export default function LandingWhyShower() {
  return (
    <RootStyle>
      <Container maxWidth="xl">
        <Grid container display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2" sx={{ textAlign: 'left' }}>
            Why restore your shower?
          </Typography>
          <Grid item container spacing={4} xs={12} md={12} sx={{ display: 'flex', alignItems: 'center' }}>
            {CARDS.map((card) => (
              <Grid key={card.title} item md={4}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle>
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
