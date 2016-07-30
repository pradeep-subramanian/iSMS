(function () {
  'use strict';

  angular
    .module('tests')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Tests',
      state: 'tests',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'tests', {
      title: 'List Tests',
      state: 'tests.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'tests', {
      title: 'Create Test',
      state: 'tests.create',
      roles: ['user']
    });
  }
})();
