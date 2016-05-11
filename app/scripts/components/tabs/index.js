import React from 'react';
import TabHeader from './tab_header.jsx';
import TabPanel from './tab_panel.jsx';

require('stylesheets/tabs');

class TabContainer extends React.Component {
  static propTypes = {
    // Required
    children: React.PropTypes.node.isRequired,
    tabs: React.PropTypes.array.isRequired,
  }

  // Initial state
  state = {
    active: 0,
  }

  tabClicked = (index) => {
    this.setState({ active: index });
  }

  render() {
    const tabHeaders = this.props.tabs.map((tab, index) =>
      <TabHeader
        key={index}
        index={index}
        title={tab}
        isActive={index === this.state.active}
        onClick={this.tabClicked}
      />
    );

    const tabPanels = React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, { isActive: index === this.state.active })
    );

    return (
      <div className="Tabs">
        <ul className="Tabs__headers">{tabHeaders}</ul>
        <div className="Tabs__content">
          {tabPanels}
        </div>
      </div>
    );
  }
}

export { TabContainer, TabPanel };
