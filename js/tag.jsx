const React = require('react');

module.exports = React.createClass({

  propTypes: {
    tag: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    selected: React.PropTypes.bool,
    remove: React.PropTypes.func,
  },

  render() {
    const selectedClass = this.props.selected === true ? 'selected' : '';
    const displayValue = typeof(tag) === 'string' ? this.props.tag : this.props.tag.value;

    return (
	    React.createElement('span',
        { className: `tag-filter-node ${selectedClass}` },
        displayValue, React.createElement('a',
          { className: 'fa fa-times tag-filter-node-remove',
            href: '#',
            onClick: this.props.remove,
          } )
        )
    );
  },
});
