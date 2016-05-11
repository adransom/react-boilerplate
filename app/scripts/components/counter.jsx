import React from 'react';

require('stylesheets/buttons');

export default class Counter extends React.Component {
  // Initial state
  state = {
    counter: 0,
    emotion: ':(',
  }

  incrementCounter = (e) => {
    e.preventDefault();

    let emotion = ':(';

    if (this.state.counter >= 9) {
      emotion = ':D';
    } else if (this.state.counter >= 0) {
      emotion = ':)';
    }

    this.setState({
      counter: this.state.counter + 1,
      emotion,
    });
  }

  render() {
    return (
      <div>
        <h3>You have {this.state.counter} cookies! {this.state.emotion}</h3>
        <button
          type="button"
          className="Button"
          onClick={this.incrementCounter}
        >
          Click me for cookies?
        </button>
      </div>
    );
  }
}
