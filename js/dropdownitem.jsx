'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {

    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      React.createElement('div', { className: 'tag-filter-dropdown-item ' + selectedClass, onClick: this.props.onSelect }, this.props.text)
    );

  }
});