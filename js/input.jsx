'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      React.createElement('input', 
        { className: 'tag-filter-input', 
          style: { width: this.props.inputWidth },
          value: this.props.value,
          onChange: this.props.onChange,
          onKeyDown: this.props.onKeyDown 
        })
    );
  }
});