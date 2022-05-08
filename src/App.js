// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import RtlLayout from './components/RtlLayout';
import NotistackProvider from './components/NotistackProvider';

import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            {/* <Settings /> */}
            <ScrollToTop />
            <Router />
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
