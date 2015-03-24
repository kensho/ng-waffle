# ng-waffle

> AngularJS wrapper around [Django Waffle](https://github.com/jsocol/django-waffle)

[![NPM][ng-waffle-icon] ][ng-waffle-url]

[![Build status][ng-waffle-ci-image] ][ng-waffle-ci-url]
[![dependencies][ng-waffle-dependencies-image] ][ng-waffle-dependencies-url]
[![devdependencies][ng-waffle-devdependencies-image] ][ng-waffle-devdependencies-url]

[ng-waffle-icon]: https://nodei.co/npm/ng-waffle.png?downloads=true
[ng-waffle-url]: https://npmjs.org/package/ng-waffle
[ng-waffle-ci-image]: https://travis-ci.org/kensho/ng-waffle.png?branch=master
[ng-waffle-ci-url]: https://travis-ci.org/kensho/ng-waffle
[ng-waffle-dependencies-image]: https://david-dm.org/kensho/ng-waffle.png
[ng-waffle-dependencies-url]: https://david-dm.org/kensho/ng-waffle
[ng-waffle-devdependencies-image]: https://david-dm.org/kensho/ng-waffle/dev-status.png
[ng-waffle-devdependencies-url]: https://david-dm.org/kensho/ng-waffle#info=devDependencies

## Install and use

`npm install ng-waffle --save` or `bower install ng-waffle`.
Include the `ng-waffle.js` script in your page and use `Waffle` module and dependency

```js
angular.module('MyApp', ['Waffle'])
  .run(function (Waffle) {
    if (Waffle.on('enable_hello')) {
        ...        
    }
  });
```

## API

**Waffle.set(flag, true|false)**

Sets given the flag

**Waffle.on(flag)**

Shortcut to turn a flag

**Waffle.off(flag)**

Shortcut to turn off a flag

**Waffle.is(flag)**

Returns current state of the flag. Alias `Waffle.flag_is_active(flag)`. There is also
`Waffle.switch_is_active(switchName)`.

**Waffle.reset()**

Removes all switches / flags.

**Waffle.flags** - object with all flags.

**Waffle.switches** - object with all switches.

## Notes

* If the flag does not exist when checking it using `Waffle.is` or `Waffle.flag_is_active` the library
throws an asynchronous error. This is useful to detect if the front end waffles got out of sync with
back end configuration.

## License

Author: Kensho &copy; 2015

* [@kensho](https://twitter.com/kensho)
* [kensho.com](http://kensho.com)

Support: if you find any problems with this library,
[open issue](https://github.com/kensho/ng-waffle/issues) on Github


The MIT License (MIT)

Copyright (c) 2015 Kensho

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



