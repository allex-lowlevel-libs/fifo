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
    var newItem = new FifoItem(content);
    this.assureForController();
    this.controller.addToBack(newItem);
    return newItem;
  };
  Fifo.prototype.pop = function(func){
    var head = this.head,
      ret;
    if (!head) {
      return;
    }
    ret = head.content;
    this.assureForController();
    this.controller.remove(head);
    head.destroy();
    return func(ret);
  };
  Fifo.prototype.drain = function(func){
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
    this.assureForController();
    this.controller.drain(func);
  };
  Fifo.prototype.drainConditionally = function (func) {
    this.assureForController();
    this.controller.drainConditionally(func);
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
