/* global require */

'use strict';

var React = require('react');
var TagFilterTag = require('./tag.jsx');
var TagFilterInput = require('./input.jsx');
var TagFilterDropdown = require('./dropdown.jsx');

var TagFilter = React.createClass({

  propTypes: {
    tags: React.PropTypes.array,
    addKeys: React.PropTypes.array,
    placeholder: React.PropTypes.string
  },

  getDefaultProps : function () {
    return {
      tags: ['first sample item', 'second item', 'third tag'],
      addKeys: [13],
      removeKeys: [46, 8],
      upKey: 38,
      downKey: 40
    };
  },

  getInitialState : function () {
    return {
      tag: '',
      tags: this.props.tags,
      dropdownItems: [],
      inputWidth: 50,
      selectedDropdownIndex: -1
    };
  },

  removeTag: function (tag) {

    var clone = this.state.tags.slice(0);

    for (var i = 0; i < clone.length; i++) {
      if (clone[i] === tag) {
        clone.splice(i, 1);
        this.setState(
          { tags: clone }
        );
        return;
      }
    }

  },

  addTag: function (tag) {
    var clone = this.state.tags.slice(0), trimmedTag = tag.trim();
    if (trimmedTag.length > 0) clone.push(tag);
    this.setState({ tags: clone, tag: '', selectedDropdownIndex: -1, dropdownItems: [] });
    this.calculateInputWidth(1);
  },

  addSuggestion: function (index) {
    this.addTag(this.state.dropdownItems[index]);
  },

  onInputChange : function (e) {
    this.setState({ tag: e.target.value, selectedDropdownIndex: -1 });
    this.calculateInputWidth(e.target.value.length);
    this.getSuggestions(e.target.value);
  },

  onInputKeyDown : function (e) {
    if (this.props.addKeys.indexOf(e.keyCode) != -1) {
      if (this.state.selectedDropdownIndex == -1) {
        this.addTag(this.state.tag);
      } else {
        this.addTag(this.state.dropdownItems[this.state.selectedDropdownIndex]);
      }
    }
    if (this.props.removeKeys.indexOf(e.keyCode) != -1 && this.refs.input.getDOMNode().selectionStart === 0) {
      this.removeTag(this.state.tags[this.state.tags.length - 1]);
    }
    if (this.props.downKey == e.keyCode) {
      e.preventDefault();
      this.selectDropdownItem('down');
    }
    if (this.props.upKey == e.keyCode) {
      e.preventDefault();
      this.selectDropdownItem('up');
    }
  },

  onClick: function (e) {
    if (e.target.className == 'tag-filter') {
      this.refs.input.getDOMNode().focus();
    }
  },

  calculateInputWidth : function (length) {
    var calculatedWidth = length * 12, maxWidth = this.refs.container.getDOMNode().offsetWidth - 20;
    this.setState({ inputWidth: calculatedWidth > maxWidth ? maxWidth : calculatedWidth });
  },

  selectDropdownItem: function (direction) {

    var index = this.state.selectedDropdownIndex;

    if (direction == 'down' && index < this.state.dropdownItems.length - 1) index++;
    if (direction == 'up' && index > 0) index--;

    this.setState( { selectedDropdownIndex: index });

  },

  getSuggestions: function (text) {
    this.setState(
      { dropdownItems : [text + ' first suggestion', text + ' second suggestion', text + ' third suggestion']}
    );
  },

  getClasses : function () {
    if(this.state.dropdownItems.length > 0) 
      return  'dropdown-open';
    return 'dropdown-closed';
  },

  render: function () {

    var tagNodes = this.state.tags.map(function (tag) {
      return React.createElement(TagFilterTag, 
        { tag: tag, remove: this.removeTag.bind(null, tag) });
    }.bind(this));

    return (
      React.createElement('div', {className: 'tag-filter-container ' + this.getClasses() }, React.createElement('div', { className: 'tag-filter', ref: 'container', onClick: this.onClick }, tagNodes, 
        React.createElement(TagFilterInput, 
          { ref: 'input',
            value: this.state.tag,
            inputWidth: this.state.inputWidth,
            onChange: this.onInputChange, 
            onKeyDown: this.onInputKeyDown })), 
        React.createElement(TagFilterDropdown, {items: this.state.dropdownItems, selectedIndex: this.state.selectedDropdownIndex, onSelect: this.addSuggestion} ))
      
    );

  }
});

React.render(React.createElement(TagFilter), document.body);