var expect = require('chai').expect,
  checks = require('allex_checkslowlevellib'),
  lib = require('..')(checks.isFunction,checks.isString);

describe('Testing \'Inherit\' lib', function(){
  it('inherit', function(){
    var chld = -1; 
    var parnt = -1;
    expect(lib.inherit.bind(lib,chld,parnt)).to.throw(Error,/is not a function/);

    chld = function(){};
    expect(lib.inherit.bind(lib,chld,parnt)).to.throw(Error,/is not a function/);

    parnt = {};
    expect(lib.inherit.bind(lib,chld,parnt)).to.throw(Error,/is not a function/);

    parnt = new Object();
    expect(lib.inherit.bind(lib,chld,parnt)).to.throw(Error,/is not a function/);

    parnt = [];
    expect(lib.inherit.bind(lib,chld,parnt)).to.throw(Error,/is not a function/);

    function A () {
      this.classname = 'A';
    }
    A.prototype.print = function () {
      console.log(this);
    };
    function B () {
      A.call(this);
      this.classname = 'B';
    }
    expect(lib.inherit(B,A)).to.be.true;
  });

  it('inheritMethods', function(){
    var chld = -1; 
    var parnt = -1;
    var methodName;
    expect(lib.inheritMethods.bind(lib,chld,parnt)).to.throw(Error,/with no methods to inherit/);
    methodName = true;
    expect(lib.inheritMethods.bind(lib,chld,parnt,methodName)).to.throw(Error,/is not a function/);
    chld = function(){};
    expect(lib.inheritMethods.bind(lib,chld,parnt,methodName)).to.throw(Error,/is not a function/);
    parnt = function(){};
    expect(lib.inheritMethods.bind(lib,chld,parnt,methodName)).to.throw(Error,/is not a string/);
    methodName = 'print';
    expect(lib.inheritMethods.bind(lib,chld,parnt,methodName)).to.throw(Error,/does not have method/);

    function A () {
      this.classname = 'A';
    }
    A.prototype.print = function () {
      console.log(this);
    };
    function B () {
      A.call(this);
      this.classname = 'B';
    }
    expect(lib.inheritMethods(B,A,methodName)).to.be.true;
  });

});
