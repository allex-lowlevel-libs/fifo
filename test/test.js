var expect = require('chai').expect,
  Checks = require('allex_checkslowlevellib'),
  DListBase = require('allex_doublelinkedlistbaselowlevellib'),
  Inherit = require('allex_inheritlowlevellib')(Checks.isFunction,Checks.isString).inherit,
  List = require('..')(DListBase,Inherit);

describe('Testing \'Fifo\' lib', function(){
  var echoFn = function(a){
    return a;
  }
  it('Length tests', function(){
    var list = new List();
    var i;
    expect(list.getFifoLength()).to.be.equal(0);
    for (i=0; i<100; i++){
      list.push(i);
    }
    expect(list.getFifoLength()).to.be.equal(100);
    for (i=0; i<50; i++){
      list.pop(echoFn);
    }
    expect(list.getFifoLength()).to.be.equal(50);
    list.purge();
    //shouldDestroy is true so the list will also be destroyed
    //slist expect 0!
    expect(list.getFifoLength()).to.be.null;
  });

  it('Structure tests (Chaining)', function(){
    var list,first,second,third,fourth;

    list = new List(); //because purge also destroys the list
    first = list.push(1); 
    second = list.push(2); 
    third = list.push(3); 
    expect(first.next).to.be.equal(second);
    expect(second.next).to.be.equal(third);
    expect(third.next).to.be.null;
    expect(third.prev).to.be.equal(second);
    expect(second.prev).to.be.equal(first);
    expect(first.prev).to.be.null;

    list.remove(second);
    expect(first.next).to.be.equal(third);

    list.purge();

    list = new List(); //because purge also destroys the list
    first = list.push(1); 
    second = list.push(2); 
    third = list.push(3); 
    fourth = list.push(4); 

    expect(first.next).to.be.equal(second);
    expect(second.next).to.be.equal(third);
    expect(third.next).to.be.equal(fourth);
    expect(fourth.next).to.be.null;
    expect(fourth.prev).to.be.equal(third);
    expect(third.prev).to.be.equal(second);
    expect(second.prev).to.be.equal(first);
    expect(first.prev).to.be.null;

    list.remove(second);
    expect(first.next).to.be.equal(third);
    expect(third.prev).to.be.equal(first);

    list.remove(third);
    expect(first.next).to.be.equal(fourth);
    expect(fourth.prev).to.be.equal(first);

    list.remove(fourth);
    expect(first.next).to.be.null;

  });

  it('remove', function(){
    var list,first,second,third,obj;
    list = new List();

    third = list.push(3); 
    second = list.push(2); 
    first = list.push(1); 
    obj = {};
    
    //TODO integrate when npm publish is allowed
    /*
    expect(list.remove.bind(list,null)).to.throw(Error,/Item is not instance of/);
    expect(list.remove.bind(list)).to.throw(Error,/Item is not instance of/);
    expect(list.remove.bind(list,obj)).to.throw(Error,/Item is not instance of/);
    expect(list.remove.bind(list,[])).to.throw(Error,/Item is not instance of/);
    */
    expect(list.remove(first)).to.be.equal(1);
    //not throwing, returning null because it the item is destroyed after last destroy
    expect(list.remove(first)).to.be.null;

  });

  it('traverse (basic)', function(){
    var list,first,second,third,obj,exp;
    list = new List();

    third = list.push(3); 
    second = list.push(2); 
    first = list.push(1); 
    
    obj = {value : 4};
    
    exp = function(obj,content){
      obj.value *= content;
    };

    list.traverse(exp.bind(null,obj));

    expect(obj.value).to.be.equal(24);

  });

  it('traverse (push while traversing)', function(){
    var list,first,second,third,obj,expAndPushWhileTraversing;
    list = new List();

    third = list.push(3); 
    second = list.push(3); 
    first = list.push(3); 
    
    obj = {value : 4};
    
    expAndPushWhileTraversing = function(list,obj,content){
      if (content === 3){
        list.push(content+1);
      }
      obj.value *= content;
    };

    list.traverse(expAndPushWhileTraversing.bind(null,list,obj));

    //even if new elements are pushed while traversing, they are not traversed
    expect(obj.value).to.be.equal(108);
    expect(list.getFifoLength()).to.be.equal(6);

  });

  it('traverse (pop while traversing)', function(){
    var list,first,second,third,obj,expAndPopWhileTraversing;
    list = new List();

    third = list.push(3); 
    second = list.push(3); 
    first = list.push(3); 
    
    obj = {value : 4};
    
    expAndPopWhileTraversing = function(list,obj,content){
      if (content === 3){
        list.pop(echoFn);
      }
      obj.value *= content;
    };

    list.traverse(expAndPopWhileTraversing.bind(null,list,obj));

    expect(obj.value).to.be.equal(108);
    expect(list.getFifoLength()).to.be.equal(0);
    
    expect(list.traverse.bind(list,false)).to.throw(Error,/is not a function/);

  });

  it('traverseConditionally', function(){
    var list,first,second,third,mul;
    list = new List();

    third = list.push(5); 
    second = list.push(3); 
    first = list.push(1); 
    
    obj = {value : 4};

    mul = function(obj,content){
      if (content > 3) return obj.value*content;
    };

    expect(list.traverseConditionally(mul.bind(null,obj))).to.be.equal(20);
    
    expect(list.traverseConditionally.bind(list,false)).to.throw(Error,/is not a function/);

  });

});
