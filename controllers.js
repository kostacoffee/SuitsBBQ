var appControllers = angular.module('appControllers', []);

appControllers.controller('viewUsers', function($scope, $mdDialog, userService){
	/*var showLogin = function() {
		$mdDialog.show({
			controller: 'viewUsers',
			templateUrl: 'loginDialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true
		});
	};*/
	userService.getUsers().then(function(members) { 
		$scope.users = members;
	});
});

