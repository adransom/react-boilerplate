import React from 'react';

export default class Quotes extends React.Component {
  static propTypes = {
    quotes: React.PropTypes.array,
  }

  // Initial state
  state = {
    quote: 0,
  }

  changeQuote = (e) => {
    e.preventDefault();

    this.setState({
      quote: Math.floor(Math.random() * this.props.quotes.length),
    });
  }

  render() {
    const quote = this.props.quotes[this.state.quote];

    return (
      <div>
        <blockquote>
          {quote.quote}
          <cite>{quote.cite}</cite>
        </blockquote>
        <button
          type="button"
          className="Button"
          onClick={this.changeQuote}
        >
          Give me a quote, dammit!
        </button>
      </div>
    );
  }
}
