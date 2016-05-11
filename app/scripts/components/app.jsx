import React from 'react';
import { Link } from 'react-router';

import { NavBar, NavItem } from './nav_bar';

export default function App(props) {
  App.propTypes = {
    // Optional
    children: React.PropTypes.node,
  };

  return (
    <div>
      <NavBar header="Boiling Hot React">
        <NavItem><Link to="/page1">Page 1</Link></NavItem>
        <NavItem><Link to="/page2">Page 2</Link></NavItem>
      </NavBar>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}
