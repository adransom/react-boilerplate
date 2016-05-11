/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routes from 'scripts/routes';


// Render the root component (<Routes />) intially, wrapped by the
// new <AppContainer>
ReactDOM.render(
  <AppContainer><Routes /></AppContainer>,
  document.getElementById('app')
);

// If hot reloading is enabled in Webpack...
if (module.hot) {
  // Accept any hot reloads affecting `scripts/routes.js` (including
  // any components it requires and renders etc.)
  module.hot.accept('scripts/routes', () => {
    // Re-import the updated component
    const HotRoutes = require('scripts/routes').default;

    // Render the updated component (state will be preserved!)
    ReactDOM.render(
      <AppContainer><HotRoutes /></AppContainer>,
      document.getElementById('app')
    );
  });
}
