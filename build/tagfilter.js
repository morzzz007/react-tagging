!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"));else if("function"==typeof define&&define.amd)define(["react"],t);else{var s=t("object"==typeof exports?require("react"):e.react);for(var n in s)("object"==typeof exports?exports:e)[n]=s[n]}}(this,function(e){return function(e){function t(n){if(s[n])return s[n].exports;var o=s[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var s={};return t.m=e,t.c=s,t.p="",t(0)}([function(e,t,s){"use strict";var n=s(1),o=s(5),r=s(4),i=s(2);e.exports=n.createClass({displayName:"exports",propTypes:{tags:n.PropTypes.array,suggestions:n.PropTypes.oneOfType([n.PropTypes.array,n.PropTypes.func]),addKeys:n.PropTypes.array,removeKeys:n.PropTypes.array,upKey:n.PropTypes.number,downKey:n.PropTypes.number},getDefaultProps:function(){return{tags:[],addKeys:[13],removeKeys:[46,8],upKey:38,downKey:40,onChange:function(){}}},getInitialState:function(){return{tag:"",tags:this.props.tags,dropdownItems:[],inputWidth:50,selectedDropdownIndex:-1}},removeTag:function(e){for(var t=this.state.tags.slice(0),s=0;s<t.length;s++)if(t[s]===e)return t.splice(s,1),this.setState({tags:t}),void this.props.onChange(t,this.state.tags)},addTag:function(e){var t=this.state.tags.slice(0),s="string"==typeof e?e.trim():e.value;s.length>0&&t.push({id:e.id,value:s}),this.setState({tags:t,tag:"",selectedDropdownIndex:-1,dropdownItems:[]}),this.calculateInputWidth(1),this.props.onChange(t,this.state.tags)},addSuggestion:function(e){this.addTag(this.state.dropdownItems[e])},onInputChange:function(e){this.setState({tag:e.target.value,selectedDropdownIndex:-1}),this.calculateInputWidth(e.target.value.length),this.getSuggestions(e.target.value)},onInputKeyDown:function(e){-1!=this.props.addKeys.indexOf(e.keyCode)&&(-1==this.state.selectedDropdownIndex?this.addTag(this.state.tag):this.addTag(this.state.dropdownItems[this.state.selectedDropdownIndex])),-1!=this.props.removeKeys.indexOf(e.keyCode)&&0===this.refs.input.getDOMNode().selectionStart&&this.removeTag(this.state.tags[this.state.tags.length-1]),this.props.downKey==e.keyCode&&(e.preventDefault(),this.selectDropdownItem("down")),this.props.upKey==e.keyCode&&(e.preventDefault(),this.selectDropdownItem("up"))},onClick:function(e){"tag-filter"==e.target.className&&this.refs.input.getDOMNode().focus()},calculateInputWidth:function(e){var t=12*e,s=this.refs.container.getDOMNode().offsetWidth-20;this.setState({inputWidth:t>s?s:t})},selectDropdownItem:function(e){var t=this.state.selectedDropdownIndex;"down"==e&&t<this.state.dropdownItems.length-1&&t++,"up"==e&&t>0&&t--,this.setState({selectedDropdownIndex:t})},getSuggestions:function(e){e=e.toLowerCase();var t=typeof this.props.suggestions;if("object"===t){var s=this.props.suggestions.filter(function(t){var s=typeof t;return"string"===s?t.toLowerCase().indexOf(e)>-1:t.value.toLowerCase().indexOf(e)>-1}),n=s.sort(function(t,s){var n="string"==typeof t?t:t.value,o="string"==typeof s?s:s.value;return n.toLowerCase().indexOf(e)>=o.toLowerCase().indexOf(e)});this.setState({dropdownItems:n})}"function"===t&&this.props.suggestions(e).then(function(e){this.setState({dropdownItems:e})}.bind(this))},getClasses:function(){return this.state.tag.length>1&&this.state.dropdownItems&&this.state.dropdownItems.length>0?"dropdown-open":"dropdown-closed"},render:function(){var e=this.state.tags.map(function(e){return n.createElement(o,{tag:e,remove:this.removeTag.bind(null,e)})}.bind(this));return n.createElement("div",{className:"tag-filter-container "+this.getClasses()},n.createElement("div",{className:"tag-filter",ref:"container",onClick:this.onClick},e,n.createElement(r,{ref:"input",value:this.state.tag,inputWidth:this.state.inputWidth,onChange:this.onInputChange,onKeyDown:this.onInputKeyDown})),n.createElement(i,{items:this.state.dropdownItems,selectedIndex:this.state.selectedDropdownIndex,onSelect:this.addSuggestion}))}})},function(t,s){t.exports=e},function(e,t,s){"use strict";var n=s(1),o=s(3);e.exports=n.createClass({displayName:"exports",render:function(){var e=[];return this.props.items&&(e=this.props.items.map(function(e,t){var s="string"==typeof e?e:e.value;return n.createElement(o,{text:s,isSelected:this.props.selectedIndex==t,onSelect:this.props.onSelect.bind(null,t)})}.bind(this))),n.createElement("div",{className:"tag-filter-dropdown"},e)}})},function(e,t,s){"use strict";var n=s(1);e.exports=n.createClass({displayName:"exports",render:function(){var e=this.props.isSelected?"selected":"";return n.createElement("div",{className:"tag-filter-dropdown-item "+e,onClick:this.props.onSelect},this.props.text)}})},function(e,t,s){"use strict";var n=s(1);e.exports=n.createClass({displayName:"exports",render:function(){return n.createElement("input",{className:"tag-filter-input",style:{width:this.props.inputWidth},value:this.props.value,onChange:this.props.onChange,onKeyDown:this.props.onKeyDown})}})},function(e,t,s){"use strict";var n=s(1);e.exports=n.createClass({displayName:"exports",render:function(){var e=this.props.selected===!0?"selected":"",t="string"==typeof tag?this.props.tag:this.props.tag.value;return n.createElement("span",{className:"tag-filter-node "+e},t,n.createElement("a",{className:"fa fa-times tag-filter-node-remove",href:"javascript:;",onClick:this.props.remove}))}})}])});