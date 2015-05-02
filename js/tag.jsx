'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {

    var selectedClass = this.props.selected === true ? 'selected' : '';

    return (
	    React.createElement('span', 
        { className: 'tag-filter-node ' + selectedClass }, 
        this.props.tag, React.createElement('a', 
          { className: 'fa fa-times tag-filter-node-remove',
            href: 'javascript:;', 
            onClick: this.props.remove
          } )
        )
    );
  }
});