function createLib(isFunction,isString){
  'use strict';
  function inherit (child, parnt) {
    if (!isFunction(child)){
      throw new Error('Child provided to "inherit" is not a function.'); 
    }
    if (!isFunction(parnt)){
      throw new Error('Parent provided to "inherit" is not a function.'); 
    }
    child.prototype = Object.create(parnt.prototype,{constructor:{
      value: child,
      enumerable: false,
      configurable: false,
      writable: false
    }});
    return true;
  }

  function attachMethod (chld, parnt, name) {
    if (!isFunction(chld)){
      throw new Error('Child provided to "inheritMethods" is not a function.'); 
    }
    if (!isFunction(parnt)){
      throw new Error('Parent provided to "inheritMethods" is not a function.'); 
    }
    if (!isString(name)){
      throw new Error('Method name provided to "inheritMethods" is not a string. Method name must be a string.');
    }
    if (!isFunction(parnt.prototype[name])){
      //console.error(el);
      throw new Error('Parent object does not have method ' + name + ' or property ' + name + ' of passed object is not a function.');
    }
    chld.prototype[name] = parnt.prototype[name];
  }

  function inheritMethods (child, parnt) {
    var methods = Array.prototype.slice.call(arguments, 2);
    if (!methods.length) throw new Error('Avoid calling this function with no methods to inherit');
    methods.forEach(attachMethod.bind(null, child, parnt));
    methods = null;
    child = null;
    parnt = null;
    return true;
  }

  return {
    inherit: inherit,
    inheritMethods: inheritMethods
  }

}

module.exports = createLib;
