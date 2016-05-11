import React from 'react';
import cx from 'classnames';

require('stylesheets/tabs');

export default class TabPanel extends React.Component {
  static propTypes = {
    // Optional
    children: React.PropTypes.node,
    isActive: React.PropTypes.bool,
  }

  static defaultProps = {
    isActive: false,
  }

  render() {
    const classes = cx(
      'TabPanel',
      { 'TabPanel--is-active': this.props.isActive }
    );

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}
