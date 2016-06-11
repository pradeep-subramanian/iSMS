(function () {
  'use strict';

  // Producers controller
  angular
    .module('producers')
    .controller('ProducersController', ProducersController);

  ProducersController.$inject = ['$scope', '$state', 'Authentication', 'producerResolve'];

  function ProducersController ($scope, $state, Authentication, producer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.producer = producer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Producer
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.producer.$remove($state.go('producers.list'));
      }
    }

    // Save Producer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.producerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.producer._id) {
        vm.producer.$update(successCallback, errorCallback);
      } else {
        vm.producer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('producers.view', {
          producerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
