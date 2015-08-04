'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {

    var selectedClass = this.props.selected === true ? 'selected' : '';
    var displayValue = typeof(tag) === 'string' ? this.props.tag : this.props.tag.value;

    return (
	    React.createElement('span', 
        { className: 'tag-filter-node ' + selectedClass }, 
        displayValue, React.createElement('a', 
          { className: 'fa fa-times tag-filter-node-remove',
            href: 'javascript:;', 
            onClick: this.props.remove
          } )
        )
    );
  }
});