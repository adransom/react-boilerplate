import React from 'react';
import { IndexLink } from 'react-router';

require('stylesheets/nav-bar');
require('stylesheets/menu');

export default function NavBar(props) {
  NavBar.propTypes = {
    // Required
    header: React.PropTypes.string.isRequired,
    // Optional
    children: React.PropTypes.node,
  };

  return (
    <nav className="NavBar">
      <div className="NavBar__left">
        <ul className="Menu">
          <li className="Menu__header"><IndexLink to="/">{props.header}</IndexLink></li>
          {props.children}
        </ul>
      </div>
    </nav>
  );
}
