(function () {
  'use strict';

  describe('Producers Route Tests', function () {
    // Initialize global variables
    var $scope,
      ProducersService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ProducersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ProducersService = _ProducersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('producers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/producers');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ProducersController,
          mockProducer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('producers.view');
          $templateCache.put('modules/producers/client/views/view-producer.client.view.html', '');

          // create mock Producer
          mockProducer = new ProducersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Producer Name'
          });

          //Initialize Controller
          ProducersController = $controller('ProducersController as vm', {
            $scope: $scope,
            producerResolve: mockProducer
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:producerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.producerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            producerId: 1
          })).toEqual('/producers/1');
        }));

        it('should attach an Producer to the controller scope', function () {
          expect($scope.vm.producer._id).toBe(mockProducer._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/producers/client/views/view-producer.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ProducersController,
          mockProducer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('producers.create');
          $templateCache.put('modules/producers/client/views/form-producer.client.view.html', '');

          // create mock Producer
          mockProducer = new ProducersService();

          //Initialize Controller
          ProducersController = $controller('ProducersController as vm', {
            $scope: $scope,
            producerResolve: mockProducer
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.producerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/producers/create');
        }));

        it('should attach an Producer to the controller scope', function () {
          expect($scope.vm.producer._id).toBe(mockProducer._id);
          expect($scope.vm.producer._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/producers/client/views/form-producer.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ProducersController,
          mockProducer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('producers.edit');
          $templateCache.put('modules/producers/client/views/form-producer.client.view.html', '');

          // create mock Producer
          mockProducer = new ProducersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Producer Name'
          });

          //Initialize Controller
          ProducersController = $controller('ProducersController as vm', {
            $scope: $scope,
            producerResolve: mockProducer
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:producerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.producerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            producerId: 1
          })).toEqual('/producers/1/edit');
        }));

        it('should attach an Producer to the controller scope', function () {
          expect($scope.vm.producer._id).toBe(mockProducer._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/producers/client/views/form-producer.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
