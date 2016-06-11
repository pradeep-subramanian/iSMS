(function () {
  'use strict';

  angular
    .module('producers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Producers',
      state: 'producers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'producers', {
      title: 'List Producers',
      state: 'producers.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'producers', {
      title: 'Create Producer',
      state: 'producers.create',
      roles: ['user']
    });
  }
})();
