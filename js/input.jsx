const React = require('react');

module.exports = React.createClass({

  propTypes: {
    inputWidth: React.PropTypes.number,
    value: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
    ]),
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
  },

  render() {
    return (
      React.createElement('input',
        { className: 'tag-filter-input',
          style: { width: this.props.inputWidth },
          value: this.props.value,
          onChange: this.props.onChange,
          onKeyDown: this.props.onKeyDown,
        })
    );
  },
});
