(function () {
  'use strict';

  angular
    .module('campaigns')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Campaigns',
      state: 'campaigns',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'campaigns', {
      title: 'List Campaigns',
      state: 'campaigns.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'campaigns', {
      title: 'Create Campaign',
      state: 'campaigns.create',
      roles: ['user']
    });
  }
})();
