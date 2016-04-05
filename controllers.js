var appControllers = angular.module('appControllers', []);

appControllers.controller('viewUsers', function($scope, $mdDialog, userService){
	$scope.isLoading = true;
	userService.getUsers().then(function(members) { 
		$scope.users = members;
		$scope.isLoading = false;
	});
	$scope.showDialog = function (ev, user) {
		$mdDialog.show({
			controller : 'dialogController',
			templateUrl : '/templates/attendanceDialog.html',
			parent : angular.element(document.body),
			clickOutsideToClose : true,
			targetEvent : ev,
			locals:{
				user : user
			}
		}).then(function(){
			userService.updateMember(user);
		})

	}
});

appControllers.controller('dialogController', function($scope, $mdDialog, user){
	$scope.hide = function(){
		$mdDialog.hide();
	}
	$scope.user = user;
});

appControllers.controller('analyticsController', function($scope, userService) {
	$scope.getAttendees = userService.getAttendees;
});