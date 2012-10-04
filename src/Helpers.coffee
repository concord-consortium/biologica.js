### jslint debug: true ###


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

Array::replaceFirst = (obj, replacement) ->
  this[this.indexOf(obj)] = replacement

Array::shuffle = ->
  top = @length;
  if top
    while (--top)
      current = Math.floor(Math.random() * (top + 1));
      tmp = this[current];
      this[current] = this[top];
      this[top] = tmp;
  return this;

window.ExtMath = {}

ExtMath.randomInt = (max) ->
  Math.floor Math.random() * max

ExtMath.flip = ->
  ExtMath.randomInt(2)
