// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingShower,
  LandingWalkInShower,
  LandingWalkSubscription,
  LandingBathtubSubscription,
  LandingWhyShower,
  LandingBathtub,
  LandingContactUs
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle
      title="Best shower mould removal service Toronto, Shower restoration Toronto, Shower regrout, Bath and shower cleaning Specialists, Complete Shower Restoration"
      id="move_top"
    >
      <LandingHero />
      <ContentStyle>
        <LandingWhyShower />
        <div id="walk">
          <LandingWalkInShower />
        </div>
        <div id="bathtub">
          <LandingBathtub />
        </div>
        <LandingShower />
        <div id="service">
          <LandingWalkSubscription />
        </div>
        <LandingBathtubSubscription />
        <div id="contact">
          <LandingContactUs />
        </div>
        {/* <LandingAdvertisement /> */}
      </ContentStyle>
    </RootStyle>
  );
}
