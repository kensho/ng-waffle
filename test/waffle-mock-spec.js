/* global helpDescribe, ngDescribe, beforeEach, it, la */
helpDescribe('waffle-mock', function () {
  /* jshint -W106 */
  var check = window.check;

  ngDescribe({
    name: 'waffle factory',
    modules: 'Waffle',
    inject: 'Waffle',
    only: false,
    tests: function (deps) {
      beforeEach(function () {
        deps.Waffle.reset();
      });

      it('window.waffle', function () {
        la(check.object(window.waffle));
      });

      it('can inject waffle mock object', function () {
        la(check.object(deps.Waffle));
      });

      it('injected object is not waffle', function () {
        la(deps.Waffle !== window.waffle);
      });

      it('but acts like one', function () {
        la(check.fn(window.waffle.flag_is_active));
        la(check.fn(deps.Waffle.flag_is_active));
      });

      it('waffle mock has set', function () {
        la(!check.fn(window.waffle.set));
        la(check.fn(deps.Waffle.set));
      });

      it('can set flags and read them', function () {
        la(!window.waffle.flag_is_active('foo'));
        deps.Waffle.set('foo', true);
        la(window.waffle.flag_is_active('foo'));
      });

      it('can use aliases', function () {
        la(!window.waffle.flag_is_active('foo'));

        deps.Waffle.on('foo');
        deps.Waffle.on('bar');

        la(window.waffle.flag_is_active('foo'), 'turned on both foo and bar');
        la(window.waffle.flag_is_active('bar'));

        deps.Waffle.off('bar');

        la(window.waffle.flag_is_active('foo'), 'after turned off bar');
        la(!window.waffle.flag_is_active('bar'));
      });

      it('can be reset', function () {
        la(check.fn(deps.Waffle.reset));
        deps.Waffle.on('foo');
        la(window.waffle.flag_is_active('foo'));
        deps.Waffle.reset();
        la(!window.waffle.flag_is_active('foo'));
      });

      it('has fluent interface', function () {
        la(deps.Waffle.set('foo', true) === deps.Waffle);
        la(deps.Waffle.set('foo', true).on('bar').flag_is_active('bar'));
      });

      it('can set multiple flags at once', function () {
        deps.Waffle.set({
          foo: true,
          bar: false
        });
        la(window.waffle.flag_is_active('foo'));
        la(!window.waffle.flag_is_active('bar'));
      });

      it('can inspect flags', function () {
        deps.Waffle.set({
          foo: true
        }).set({
          bar: false
        });
        la(deps.Waffle.is('foo'));
        la(!deps.Waffle.is('bar'));
        la(check.object(deps.Waffle.flags));
        la(deps.Waffle.flags.foo);
        la(deps.Waffle.flags.bar === false);
      });
    }
  });
});
