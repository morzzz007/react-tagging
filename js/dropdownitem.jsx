const React = require('react');

module.exports = React.createClass({

  propTypes: {
    text: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },

  render() {
    const selectedClass = this.props.isSelected ? 'selected' : '';

    return (
      React.createElement('div', { className: `tag-filter-dropdown-item ${selectedClass}`, onClick: this.props.onSelect }, this.props.text)
    );
  },
});
