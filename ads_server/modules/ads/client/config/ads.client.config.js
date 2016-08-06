(function () {
  'use strict';

  angular
    .module('ads')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Ads',
      state: 'ads',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'ads', {
      title: 'List Ads',
      state: 'ads.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'ads', {
      title: 'Create Ad',
      state: 'ads.create',
      roles: ['user']
    });
  }
})();
