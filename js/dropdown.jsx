'use strict';

var React = require('react');
var TagFilterDropdownItem = require('./dropdownitem.jsx');

module.exports = React.createClass({

  render: function () {

    var dropDownItems = [];
    
    if(this.props.items) {
      dropDownItems = this.props.items.map(function (item, i) {
        var displayText = typeof(item) === 'string' ? item : item.value;
        return React.createElement(TagFilterDropdownItem, 
          { text: displayText, isSelected: this.props.selectedIndex == i, onSelect: this.props.onSelect.bind(null, i) });
        }.bind(this));
    }

    return (
      React.createElement('div', { className: 'tag-filter-dropdown' }, dropDownItems)
    );

  }
});