function createFifo(doublelinkedlistbase, inherit) {
  'use strict';

  var ListItemCtor = doublelinkedlistbase.Item,
    ListMixin = doublelinkedlistbase.Mixin;

  function FifoItem(content) {
    ListItemCtor.call(this, content);
  }

  inherit(FifoItem, ListItemCtor);

  FifoItem.prototype.apply = function(func) {
    return func(this.content);
  };


  function Fifo(){
    ListMixin.call(this);
  }

  ListMixin.addMethods(Fifo);

  Fifo.prototype.push = function(content){
    var newItem;
    if (!this.assureForController()) {
      return;
    }
    newItem = new FifoItem(content); 
    this.controller.addToBack(newItem);
    return newItem;
  };

  Fifo.prototype.pop = function(func){
    var head = this.head,
      ret;
    if (!head) {
      return;
    }
    if (!this.assureForController()) {
      return;
    }
    ret = head.content;
    this.controller.remove(head);
    head.destroy();
    return func(ret);
  };

  Fifo.prototype.drain = function(func){
    //TODO integrate with checks?
    if (arguments.length !=1) {
      console.trace();
      console.error('Just a Function need be passed to drain');
      process.exit(0);
      return;
    }
    if ('function' !== typeof func) {
      console.trace();
      console.error('drain expects a Function as a parameter');
      process.exit(0);
      return;
    }
    if (!this.assureForController()) {
      return;
    }
    this.controller.drain(func);
  };

  Fifo.prototype.drainConditionally = function (func) {
    if (!this.assureForController()) {
      return;
    }
    this.controller.drainConditionally(func);
  };

  Fifo.prototype.traverse = function(func){
    if ('function' !== typeof func){
      throw new Error('First parameter is not a function.');
    }
    if (!this.head) {
      return;
    }
    if (!this.assureForController()) {
      return;
    }
    this.controller.traverse(func);
  };
  Fifo.prototype.traverseSafe = function(func, errorcaption){
    if ('function' !== typeof func){
      throw new Error('First parameter is not a function.');
    }
    if (!this.head) {
      return;
    }
    if (!this.assureForController()) {
      return;
    }
    this.controller.traverseSafe(func, errorcaption);
  };

  Fifo.prototype.traverseConditionally = function(func){
    if ('function' !== typeof func){
      throw new Error('First parameter is not a function.');
    }
    var head = this.head;
    if (!head) {
      return;
    }
    if (!this.assureForController()) {
      return;
    }
    return this.controller.traverseConditionally(func);
  };

  Fifo.prototype.peek = function(){
    return this.head;
  }

  Fifo.prototype.last = function () {
    if (this.tail) {
      return this.tail.content;
    }
  };

  Fifo.prototype.getFifoLength = function () {
    return this.length;
  };

  return Fifo;
}

module.exports = createFifo;
