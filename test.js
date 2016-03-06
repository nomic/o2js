'use strict';

var expect = require('chai').expect,
    o2 = require('./index');

suite('o2', function() {

  test('exception if ":" is omitted from tag name', function() {
    expect(function() {
      return o2(['div']);
    }).to.throw();
  });

  test('exception on empty string tag name', function() {
    expect(function() {
      return o2(['']);
    }).to.throw();
  });

  test('exception on empty array', function() {
    expect(function() {
      return o2([]);
    }).to.throw();
  });

  test('basic string', function() {
    expect(o2('hello').nodeType).to.equal(3);
  });

  test('basic tag with string content', function() {
    expect(o2([':div', 'hello']).children[0].textContent).to.equal('hello');
  });

  suite('tag name', function() {
    test('basics', function() {
      expect(o2([':div']).tagName).to.equal('div');
    });
  });

  suite('node type', function() {
  });

  suite('attributes', function() {
  });

  suite('children', function() {
  });

});
