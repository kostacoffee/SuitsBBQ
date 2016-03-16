var appControllers = angular.module('appControllers', []);

appControllers.controller('viewUsers', function($scope, $mdDialog, userService){
	/*userService.getUsers().then(function(members) { 
		$scope.users = members;
	});*/
	$scope.users = [{"first": "asd", "last": "dsa", "access":1234}, {"first": "test", "last": "test", "access":1}];
	$scope.showDialog = function (ev, user) {
		$mdDialog.show({
			controller : 'dialogController',
			templateUrl : 'loginDialog.html',
			parent : angular.element(document.body),
			clickOutsideToClose : true,
			targetEvent : ev,
			locals:{
				user : user
			}
		})
	}
});

appControllers.controller('dialogController', function($scope, $mdDialog, user){
	$scope.hide = function(){
		$mdDialog.hide();
	}
	$scope.user = user;
});