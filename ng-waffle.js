(function (angular, waffle, la, lac) {
  'use strict';

  /* jshint -W106 */
  var m = angular.module('Waffle', []);

  if (!la) {
    la = function la(predicate) {
      if (!predicate) {
        var msg = Array.prototype.slice.call(arguments, 1)
          .map(function (x) {
            return typeof x === 'string' ? x : JSON.stringify(x);
          }).join(' ');
        throw new Error(msg);
      }
    };
  }

  // throws an error asynchronously
  var warn = lac ? lac : function warn(predicate) {
    if (!predicate) {
      var msg = Array.prototype.slice.call(arguments, 1)
        .map(function (x) {
          return typeof x === 'string' ? x : JSON.stringify(x);
        }).join(' ');
      setTimeout(function () {
        throw new Error(msg);
      }, 0);
    }
  };

  function unemptyString(x) {
    return x && typeof x === 'string';
  }

  // removes all keys from an existing object
  function cleanObject(obj) {
    Object.keys(obj).forEach(function (key) {
      delete obj[key];
    });
  }

  /*
    Mock waffles for unit testing or for wrapping around existing waffle object
    Places waffle on global scope, with same methods as production waffle

    By injecting 'Waffle' factory into your spec you get another
    object that can turn on/off waffles on demand. You cannot control switches.

      // inject Waffle in spec
      beforeEach(angular.mock.module('Waffle'));
      var waffleMock;
      beforeEach(inject(function (Waffle) {
        waffleMock = WaffleMock;
      }));

      it('works', function () {
        waffleMock.set('flag', true);
        ...
      });

    You can use shortcuts in WaffleMock: .on, .off, etc and inspect
    the flags (.is, .flags) You can even set multiple flags at once

      waffleMock.set({
        flag1: true,
        flag2: false
      });

    see waffle-mock-spec.js
  */
  var _waffle_switches = {};
  var _waffle_flags = {};

  m.factory('Waffle', function () {
    if (!waffle) {
      // mock waffle
      window.waffle = {
        flag_is_active: function (key) {
          la(unemptyString(key), 'expected string waffle flag', key);
          la(typeof _waffle_flags[key] !== 'undefined',
            'cannot find flag', key, _waffle_flags);
          return Boolean(_waffle_flags[key]);
        },

        switch_is_active: function (key) {
          la(unemptyString(key), 'expected string switch flag', key);
          la(typeof _waffle_switches[key] !== 'undefined',
            'cannot find flag', key);
          return Boolean(_waffle_switches[key]);
        }
      };
    }

    la(window.waffle, 'cannot find window.waffle');
    var waffleMock = Object.create(window.waffle);

    // add additional check
    waffleMock.flag_is_active = function flag_is_active(key) {
      la(unemptyString(key), 'expected string waffle flag', key);
      var value = window.waffle.flag_is_active(key);
      warn(typeof value !== 'undefined', 'cannot find flag', key);
      return value;
    };

    waffleMock.reset = function () {
      cleanObject(_waffle_flags);
      cleanObject(_waffle_switches);
    };

    waffleMock.set = function (flag, value) {
      if (arguments.length === 1 && typeof flag === 'object') {
        Object.keys(flag).forEach(function (key) {
          waffleMock.set(key, flag[key]);
        });
        return this;
      }

      // TODO(gleb): add arguments support to lazy-ass
      la(arguments.length === 2, 'invalid arguments', arguments.length);
      la(unemptyString(flag), 'missing flag name', flag);
      _waffle_flags[flag] = Boolean(value);
      return this;
    };

    // shortcuts
    waffleMock.on = function on(flag) {
      return waffleMock.set(flag, true);
    };

    waffleMock.off = function off(flag) {
      return waffleMock.set(flag, false);
    };

    waffleMock.is = waffleMock.flag_is_active;
    waffleMock.flags = _waffle_flags;
    waffleMock.switches = _waffle_switches;

    return waffleMock;
  });

}(window.angular, window.waffle, window.la, window.lac));
