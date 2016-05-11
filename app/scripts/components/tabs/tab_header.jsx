import React from 'react';

require('stylesheets/tabs');

export default class TabHeader extends React.Component {
  static propTypes = {
    // Required
    index: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    // Optional
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    isActive: false,
  }

  onClick = (e) => {
    e.preventDefault();

    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <li key={this.props.index} className="TabHeader">
        <a
          href=""
          onClick={this.onClick}
          aria-selected={this.props.isActive ? true : null}
        >
          {this.props.title}
        </a>
      </li>
    );
  }
}
