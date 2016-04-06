var appControllers = angular.module('appControllers', []);

appControllers.controller('viewUsers', function($scope, $mdDialog, userService){
	$scope.isLoading = true;
	userService.getUsers().then(function(members) { 
		$scope.users = members;
		$scope.isLoading = false;
	});
	$scope.showDialog = function (ev, user) {
		$mdDialog.show({
			controller : 'attendanceDialogController',
			templateUrl : '/templates/attendanceDialog.html',
			parent : angular.element(document.body),
			clickOutsideToClose : true,
			targetEvent : ev,
			locals:{
				user : user
			}
		});
	}
	$scope.addAttendee = function(ev) {
		$mdDialog.show({
			controller : 'addAttendeeController',
			templateUrl : '/templates/addAttendeeDialog.html',
			parent : angular.element(document.body),
			clickOutsideToClose : true,
			targetEvent : ev
		}).then(function(attendee){
			$scope.users.push(attendee);
		});
	}
});

appControllers.controller('addAttendeeController', function($scope, $mdDialog){
	$scope.addAttendee = function() {
		$mdDialog.hide($scope.attendee);
	}
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	$scope.attendee = {}; 
});

appControllers.controller('attendanceDialogController', function($scope, $mdDialog, user){
	$scope.hide = function(){
		$mdDialog.hide();
	}
	$scope.user = user;
});

appControllers.controller('reportController', function($scope, userService) {
	$scope.getAttendees = userService.getAttendees;
});