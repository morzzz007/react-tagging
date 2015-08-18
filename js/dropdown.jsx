const React = require('react');
const TagFilterDropdownItem = require('./dropdownitem.jsx');

module.exports = React.createClass({

  propTypes: {
    items: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    onSelect: React.PropTypes.func,
    displayField: React.PropTypes.string,
  },

  render() {
    let dropDownItems = [];

    if (this.props.items) {
      dropDownItems = this.props.items.map((item, i) => {
        const displayText = typeof(item) === 'string' ? item : item[this.props.displayField];
        return React.createElement(TagFilterDropdownItem,
          { text: displayText, isSelected: this.props.selectedIndex === i, onSelect: this.props.onSelect.bind(null, i) });
      }.bind(this));
    }

    return (
      React.createElement('div', { className: 'tag-filter-dropdown' }, dropDownItems)
    );
  },
});
