var get = Ember.get,
    set = Ember.set,
    run = Ember.run,
    EmberObject = Ember.Object,
    computedReverse = Ember.computed.reverse,
    obj;

module('Ember.computed.reverse', {
  setup: function() {
    run(function() {
      obj = EmberObject.createWithMixins({
        array: Ember.A([ 1, 2, 3, 4, 5 ]),
        reverseArray: computedReverse('array')
      });
    });
  },
  teardown: function() {
    run(function() {
      obj.destroy();
    });
  }
});

test('reverses the values in the dependentKey', function(){
  var reversed = get(obj, 'reverseArray');
  deepEqual(reversed, [ 5, 4, 3, 2, 1 ], "reverses the original array");
});

test('reverses when pushing items', function(){
  var array = get(obj, 'array');

  array.pushObject(6);
  deepEqual(get(obj, 'reverseArray'), [ 6, 5, 4, 3, 2, 1 ], "array is reversed after pushing object");

  array.pushObjects([7, 8, 9]);
  deepEqual(get(obj, 'reverseArray'), [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ], "array is reversed after pushing multiple objects");
});

test('reverses when inserting items', function(){
  var array = get(obj, 'array');

  array.insertAt(3, 'A');
  deepEqual(get(obj, 'reverseArray'), [ 5, 4, 'A', 3, 2, 1 ], "array is reversed after inserting object in the middle");

  array.replace(4, 0, ['B', 'C', 'D']);
  deepEqual(get(obj, 'reverseArray'), [ 5, 4, 'D', 'C', 'B', 'A', 3, 2, 1 ], "array is reversed after inserting multiple objects in the middle");

  array.replace(0, 0, ['X', 'Y', 'Z']);
  deepEqual(get(obj, 'reverseArray'), [ 5, 4, 'D', 'C', 'B', 'A', 3, 2, 1, 'Z', 'Y', 'X' ], "array is reversed after inserting multiple objects at the beginning");
});

test('reverses when replacing items', function(){
  var array = get(obj, 'array');

  array.replace(1, 3, ['X', 'Y']);
  deepEqual(get(obj, 'reverseArray'), [ 5, 'Y', 'X', 1 ], "array is reversed after replacing objects");

  array.replace(0, 1, ['A']);
  deepEqual(get(obj, 'reverseArray'), [ 5, 'Y', 'X', 'A' ], "array is reversed after replacing objects");
});

test('reverses when removing items', function(){
  var array = get(obj, 'array');

  array.removeAt(2);
  deepEqual(get(obj, 'reverseArray'), [ 5, 4, 2, 1 ], "array is reversed after removing object in middle");

  array.removeAt(1, 2);
  deepEqual(get(obj, 'reverseArray'), [ 5, 1 ], "array is reversed after removing multiple objects in middle");

  array.popObject();
  deepEqual(get(obj, 'reverseArray'), [ 1 ], "array is reversed after popping object");
});

test('reverse works starting with an empty array', function() {
  var obj = EmberObject.createWithMixins({
    array: Ember.A(),
    reverseArray: computedReverse('array')
  });

  deepEqual(get(obj, 'reverseArray'), [], "reverses of empty array is empty");

  var array = get(obj, 'array');
  array.pushObjects([1, 2, 3]);
  deepEqual(get(obj, 'reverseArray'), [ 3, 2, 1 ], "array is reversed after pushing objects onto empty array");
});

test('reverse works when setting an array', function() {
  var obj = EmberObject.createWithMixins({
    array: null,
    reverseArray: computedReverse('array')
  });

  var array = set(obj, 'array', Ember.A([1, 2, 3]));
  deepEqual(get(obj, 'reverseArray'), [ 3, 2, 1 ], "array is reversed after setting a new array");
});