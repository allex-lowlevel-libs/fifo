# inherit
This is a simple lib that exports just two functions:

##inherit
A well known JavaScript inheritance pattern. Expects two parameters:
- First one is the child "_class_"
- Second one is the parent "_class_"

It will create the prototype of the child "_class_" according to the prototype of the parent "_class_".


##inheritMethods
This function expects `2+N` parameters: 
- First one is the child "_class_"
- Second one is the parent "_class_"
- 2+1st is the name of the first method to be copied from the parent "_class_" prototype to the child "_class_" prototype
- and so forth

Useful for mixin situations (when "implementing interfaces").

##Installation

npm install allex_inheritlowlevellib

##Usage

```javascript

var inheritlib = require('allex_inheritlowlevellib'),
  inherit = inheritlib.inherit,
  inheritMethods = inheritlib.inheritMethods;

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
inherit(B, A);

var b = new B();
b.print();

function C () {
}
inheritMethods(C, A, 'print');

var c = new C();
c.print();

```

