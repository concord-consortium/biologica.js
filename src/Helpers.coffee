### jslint debug: true ###


arrayRemoveObject = (array, obj) ->
  i = array.indexOf(obj)
  if i >= 0
    array.splice(i, 1)
    true
  else
    false

arrayShuffle = (array) ->
  top = array.length;
  if top
    while (--top)
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
  return array;

window.ExtMath = {}

ExtMath.randomInt = (max) ->
  Math.floor Math.random() * max

ExtMath.flip = ->
  ExtMath.randomInt(2)
