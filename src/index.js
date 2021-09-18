import React from 'react';
import ReactDOM from 'react-dom';

// Apps
import AppMobile from './AppMobile';
import AppDesktop from './AppDesktop';

import { store } from './helpers';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';


// For Detect device, and render view according to the detected device type
import { BrowserView, MobileView, isDesktop, isMobileOnly } from "react-device-detect";


ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>

      <BrowserView>
        {isDesktop ? (
          <>

            <AppDesktop />

          </>
        ) : null}
      </BrowserView>
      <MobileView>
        {
          isMobileOnly ? <AppMobile /> : null
        }
      </MobileView>

    </BrowserRouter>
  </Provider >,
  document.getElementById('root')
);


