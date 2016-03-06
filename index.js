'use strict';

var _ = require('lodash'),
    assert = require('assert');

function Context(r) {
  if (_.isArray(r)) {
    assert(r[0]);
    assert(r[0][0] === ':');
    this.tagName = r[0].slice(1);
    this.nodeType = 1;
    this.attributes = _.isPlainObject(r[1])
      ? _.cloneDeep(r[1])
      : {};
    this.children = _.map(
      r.slice(
        _.isPlainObject(r[1]) ? 2 : 1), function(c) {
          return new Context(c);
        });
  } else if (_.isString(r)) {
    this.nodeType = 3;
    this.textContent = r;
  }
}

Context.prototype.render = function(document) {
  var el;
  if (this.nodeType === 1) {
    el = document.createElement(this.tagName);
  } else if (this.nodeType === 3) {
    el = document.createTextNode(this.textContent);
  }
  _.each(this.attributes, function(val, key) {
    el.setAttribute(key, val);
  });
  _.each(this.children, function(child) {
    el.appendChild(child.render(document));
  });
  return el;
};

function o2(r) {
  return new Context(r);
}

module.exports = o2;
