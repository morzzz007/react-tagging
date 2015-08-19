const React = require('react/addons');
const TagFilterTag = require('./tag.jsx');
const TagFilterInput = require('./input.jsx');
const TagFilterDropdown = require('./dropdown.jsx');

module.exports = React.createClass({

  propTypes: {
    tags: React.PropTypes.array,
    suggestions: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func,
    ]),
    addKeys: React.PropTypes.array,
    removeKeys: React.PropTypes.array,
    upKey: React.PropTypes.number,
    downKey: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onAdd: React.PropTypes.func,
    displayField: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      tags: [],
      addKeys: [13],
      removeKeys: [46, 8],
      upKey: 38,
      downKey: 40,
      onChange() {},
      displayField: 'value',
    };
  },

  getInitialState() {
    return {
      tag: '',
      tags: this.props.tags,
      dropdownItems: [],
      inputWidth: 50,
      selectedDropdownIndex: -1,
    };
  },

  removeTag(tag) {
    const clone = [...this.state.tags];

    for (let i = 0; i < clone.length; i++) {
      if (clone[i] === tag) {
        clone.splice(i, 1);
        this.setState(
          { tags: clone }
        );
        this.props.onChange(clone, this.state.tags);
        return;
      }
    }
  },

  addTag(tag) {
    const trimmedTag = typeof(tag) === 'string' ? tag.trim() : tag[this.props.displayField];

    if (trimmedTag.length === 0) return;
    const baseObject = { [this.props.displayField]: trimmedTag };

    function handleAdd(result) {
      const clone = React.addons.update(this.state.tags, { $push: [result] });
      this.setState({ tags: clone, tag: '', selectedDropdownIndex: -1, dropdownItems: [] });
      this.calculateInputWidth(1);
      this.props.onChange(clone, this.state.tags);
    }

    if (typeof(this.props.onAdd) === 'function') {
      this.props.onAdd(baseObject, this.state.tags).then(result => {
        handleAdd.bind(this, result)();
      });
    } else {
      handleAdd.bind(this, baseObject)();
    }
  },

  addSuggestion(index) {
    this.addTag(this.state.dropdownItems[index]);
  },

  onInputChange(e) {
    this.setState({ tag: e.target.value, selectedDropdownIndex: -1 });
    this.calculateInputWidth(e.target.value.length);
    this.getSuggestions(e.target.value);
  },

  onInputKeyDown(e) {
    if (this.props.addKeys.indexOf(e.keyCode) !== -1) {
      if (this.state.selectedDropdownIndex === -1) {
        this.addTag(this.state.tag);
      } else {
        this.addTag(this.state.dropdownItems[this.state.selectedDropdownIndex]);
      }
    }
    if (this.props.removeKeys.indexOf(e.keyCode) !== -1 && this.refs.input.getDOMNode().selectionStart === 0) {
      this.removeTag(this.state.tags[this.state.tags.length - 1]);
    }
    if (this.props.downKey === e.keyCode) {
      e.preventDefault();
      this.selectDropdownItem('down');
    }
    if (this.props.upKey === e.keyCode) {
      e.preventDefault();
      this.selectDropdownItem('up');
    }
  },

  onClick(e) {
    if (e.target.className === 'tag-filter') {
      this.refs.input.getDOMNode().focus();
    }
  },

  calculateInputWidth(length) {
    const calculatedWidth = length * 12;
    const maxWidth = this.refs.container.getDOMNode().offsetWidth - 20;
    this.setState({ inputWidth: calculatedWidth > maxWidth ? maxWidth : calculatedWidth });
  },

  selectDropdownItem(direction) {
    let index = this.state.selectedDropdownIndex;

    if (direction === 'down' && index < this.state.dropdownItems.length - 1) index++;
    if (direction === 'up' && index > 0) index--;

    this.setState( { selectedDropdownIndex: index });
  },

  getSuggestions(text) {
    const suggestionText = text.toLowerCase();
    const type = typeof(this.props.suggestions);

    if (type === 'object') {
      const filtered = this.props.suggestions.filter(function suggestionFilter(value) {
        if (typeof(value) === 'string') return value.toLowerCase().indexOf(suggestionText) > -1;
        return value.value.toLowerCase().indexOf(suggestionText) > -1;
      });

      const sorted = filtered.sort(function suggestionSort(a, b) {
        const tempA = typeof(a) === 'string' ? a : a.value;
        const tempB = typeof(b) === 'string' ? b : b.value;

        return tempA.toLowerCase().indexOf(suggestionText) >= tempB.toLowerCase().indexOf(text);
      });

      this.setState(
        { dropdownItems: sorted }
      );
    }

    if (type === 'function') {
      this.props.suggestions(text).then(result => {
        this.setState(
          { dropdownItems: result }
        );
      }.bind(this));
    }
  },

  getClasses() {
    if (this.state.tag.length > 1 && this.state.dropdownItems && this.state.dropdownItems.length > 0) return 'dropdown-open';
    return 'dropdown-closed';
  },

  render() {
    const tagNodes = this.state.tags.map( (tag, key) => {
      return React.createElement(TagFilterTag,
        { key, tag: tag, remove: this.removeTag.bind(null, tag), displayField: this.props.displayField });
    }.bind(this));

    return (
      React.createElement('div', {className: `tag-filter-container ${this.getClasses()}` }, React.createElement('div', { className: 'tag-filter', ref: 'container', onClick: this.onClick }, tagNodes,
        React.createElement(TagFilterInput,
          { ref: 'input',
            value: this.state.tag,
            inputWidth: this.state.inputWidth,
            onChange: this.onInputChange,
            onKeyDown: this.onInputKeyDown })),
        React.createElement(TagFilterDropdown, {items: this.state.dropdownItems, selectedIndex: this.state.selectedDropdownIndex, onSelect: this.addSuggestion} ))
    );
  },
});
