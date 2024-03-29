# Ember.computed.reverse [![Build Status](https://travis-ci.org/gdub22/ember-computed-reverse.svg?branch=master)](https://travis-ci.org/gdub22/ember-computed-reverse)

A computed property macro for [ember.js](http://emberjs.com) that returns a reversed array without allocating a new array on each replace action.

### Usage

Include `ember-computed-reverse.js` after `ember.js` in your app.

Or using package managers:
```bash
npm install ember-computed-reverse
```
```bash
bower install ember-computed-reverse
```

### Examples

```javascript
App.Timeline = Ember.Object.extend({
  reverseChronPosts: Ember.computed.reverse('posts')
});

var timeline = App.Timeline.create({posts: [
  'good morning',
  'grabbing lunch',
  'making dinner'
]});
timeline.get('reverseChronPosts'); // ['making dinner', 'grabbing lunch', 'good morning']
```

### Why?

Simply using a computed property with toArray().reverse() will recreate a new array every time an item is added/removed from the array. With a large array of items, or complex DOM representation of these items, re-rendering becomes expensive. This leverages reduce computed arrays to perform replace actions one at a time.

### Demo

You can see the benefits in this [demo](http://jsbin.com/tefusare/2)