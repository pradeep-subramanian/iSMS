(function () {
  'use strict';

  angular
    .module('producers')
    .controller('ProducersListController', ProducersListController);

  ProducersListController.$inject = ['ProducersService'];

  function ProducersListController(ProducersService) {
    var vm = this;

    vm.producers = ProducersService.query();
  }
})();
