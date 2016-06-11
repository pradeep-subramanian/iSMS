(function () {
  'use strict';

  angular
    .module('producers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('producers', {
        abstract: true,
        url: '/producers',
        template: '<ui-view/>'
      })
      .state('producers.list', {
        url: '',
        templateUrl: 'modules/producers/client/views/list-producers.client.view.html',
        controller: 'ProducersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Producers List'
        }
      })
      .state('producers.create', {
        url: '/create',
        templateUrl: 'modules/producers/client/views/form-producer.client.view.html',
        controller: 'ProducersController',
        controllerAs: 'vm',
        resolve: {
          producerResolve: newProducer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Producers Create'
        }
      })
      .state('producers.edit', {
        url: '/:producerId/edit',
        templateUrl: 'modules/producers/client/views/form-producer.client.view.html',
        controller: 'ProducersController',
        controllerAs: 'vm',
        resolve: {
          producerResolve: getProducer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Producer {{ producerResolve.name }}'
        }
      })
      .state('producers.view', {
        url: '/:producerId',
        templateUrl: 'modules/producers/client/views/view-producer.client.view.html',
        controller: 'ProducersController',
        controllerAs: 'vm',
        resolve: {
          producerResolve: getProducer
        },
        data:{
          pageTitle: 'Producer {{ articleResolve.name }}'
        }
      });
  }

  getProducer.$inject = ['$stateParams', 'ProducersService'];

  function getProducer($stateParams, ProducersService) {
    return ProducersService.get({
      producerId: $stateParams.producerId
    }).$promise;
  }

  newProducer.$inject = ['ProducersService'];

  function newProducer(ProducersService) {
    return new ProducersService();
  }
})();
