(function () {
  'use strict';

  // Campaigns controller
  angular
    .module('campaigns')
    .controller('CampaignsController', CampaignsController);

  CampaignsController.$inject = ['$scope', '$http', '$state', 'Authentication', 'campaignResolve'];
  
  function CampaignsController ($scope, $http, $state, Authentication, campaign) {
    var vm = this;

    vm.authentication = Authentication;
    vm.campaign = campaign;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
	//vm.helloworld = helloworld;
		
		$http({method: 'GET', url: 'http://localhost:4000/api/ads'}).
			then(function(response) {
				vm.adsList=response.data;
				//$scope.status = response.status;
				//$scope.data = response.data;
			}, function(response) {
			//$scope.data = response.data || "Request failed";
			//$scope.status = response.status;
		});
		
		
		vm.campaignAds = [];
		//problem with putting this code here is that vm.campaign.advertisement doesn't always exist. When "Edit" campaign it exists, but create new it doesn't.
		if(vm.campaign.advertisement!=null){
		for(var i=0; i<vm.campaign.advertisement.length; i++){
			var url = 'http://localhost:4000/api/ads/' + vm.campaign.advertisement[i];
			$http({method: 'GET', url: url}).
			then(function(response) {
				//vm.campaignAds.push({url: response.data.url}); //working
				//vm.campaignAds = response.data;
				vm.campaignAds.push(response.data);
			}, function(response) {
		});
		}
			//vm.campaignAds.push({example:"bbb", example2:"aaa"});
		}
		//vm.test = JSON.stringify(vm.campaignAds);
		/*
		$http({method: 'GET', url: 'http://localhost:4000/campaigns'}).
			then(function(response) {
				vm.campaigns=response.data;
				//$scope.status = response.status;
				//$scope.data = response.data;
			}, function(response) {
			//$scope.data = response.data || "Request failed";
			//$scope.status = response.status;
		});
		*/
		
	//tim test start
	function helloworld(){
		
		vm.test = "hello";
		
		$http({method: 'GET', url: 'http://localhost:4000/api/ads'}).
			then(function(response) {
				vm.test=response.data + response.status;
				//$scope.status = response.status;
				//$scope.data = response.data;
			}, function(response) {
			//$scope.data = response.data || "Request failed";
			//$scope.status = response.status;
		});
	}
  //tim test end
	
	
    // Remove existing Campaign
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.campaign.$remove($state.go('campaigns.list'));
      }
    }

    // Save Campaign
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.campaignForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.campaign._id) {
        vm.campaign.$update(successCallback, errorCallback);
      } else {
        vm.campaign.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('campaigns.view', {
          campaignId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
	