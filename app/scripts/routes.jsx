import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'scripts/components/app';
import PageOne from 'scripts/components/page_one';
import PageTwo from 'scripts/components/page_two';
import HomePage from 'scripts/components/home_page';

export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/page1" component={PageOne} />
        <Route path="/page2" component={PageTwo} />
      </Route>
    </Router>
  );
}
