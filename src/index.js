// scroll bar
import 'simplebar/src/simplebar.css';
// map
import 'mapbox-gl/dist/mapbox-gl.css';
// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </LocalizationProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
