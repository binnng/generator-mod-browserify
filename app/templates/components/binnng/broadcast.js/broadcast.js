// Generated by CoffeeScript 1.7.1
define("binnng/broadcast", function(require, exports, module) {
  var WIN, broadcast;
  WIN = window;
  broadcast = {
    on: function(name, fn) {
      var eventData;
      eventData = broadcast.data;
      if (eventData.hasOwnProperty(name)) {
        return eventData[name].push(fn);
      } else {
        return eventData[name] = [fn];
      }
    },
    fire: function(name, data, thisArg) {
      var fn, fnList, _i, _len, _results;
      thisArg = thisArg || WIN;
      fnList = broadcast.data[name] || [];
      _results = [];
      for (_i = 0, _len = fnList.length; _i < _len; _i++) {
        fn = fnList[_i];
        _results.push(fn.apply(thisArg, [name, data]));
      }
      return _results;
    },
    data: {}
  };
  return module.exports = broadcast;
});
