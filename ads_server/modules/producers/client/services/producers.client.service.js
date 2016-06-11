//Producers service used to communicate Producers REST endpoints
(function () {
  'use strict';

  angular
    .module('producers')
    .factory('ProducersService', ProducersService);

  ProducersService.$inject = ['$resource'];

  function ProducersService($resource) {
    return $resource('api/producers/:producerId', {
      producerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
