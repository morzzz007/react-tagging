'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      React.createElement('input', 
        { className: 'tag-filter-input', 
          value: this.props.value,
          style: { width: this.props.inputWidth },
          onChange: this.props.onChange,
          onKeyDown: this.props.onKeyDown 
        })
    );
  }
});