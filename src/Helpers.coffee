
# [a,b,c,d].remove(1) => [a,c,d]
# [a,b,c,d].remove(0,2) => [d]
Array::remove = (from, to) ->
  rest = this.slice((to || from) + 1 || this.length);
  this.length = if from < 0 then this.length + from else from;
  return this.push.apply(this, rest);

Array::removeObj = (obj) ->
  i = this.indexOf(obj)
  if ~i
    this.remove(i)
    true
  else
    false

Array::shuffle = ->
  i = @length;
  return false if i is 0 ;
  while (--i)
   j       = Math.floor( Math.random() * (i + 1) )
   tempi   = this[i];
   tempj   = this[j];
   this[i] = tempj;
   this[j] = tempi;
  return this;

window.ExtMath = {}

ExtMath.randomInt = (max) ->
  Math.floor Math.random() * max

ExtMath.flip = ->
  ExtMath.randomInt(2)