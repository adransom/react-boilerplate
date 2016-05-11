import React from 'react';

export default function NavItem(props) {
  NavItem.propTypes = {
    // Optional
    children: React.PropTypes.node,
  };

  return (
    <li>{props.children}</li>
  );
}
