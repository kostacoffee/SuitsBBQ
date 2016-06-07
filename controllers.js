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
			templateUrl : '/components/attendanceDialog.html',
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
			templateUrl : '/components/addAttendeeDialog.html',
			parent : angular.element(document.body),
			clickOutsideToClose : true,
			targetEvent : ev
		}).then(function(attendee){
			$scope.users.push(attendee);
			$scope.showDialog(ev, attendee);
		});
	}
});

appControllers.controller('addAttendeeController', function($scope, $mdDialog){
	$scope.addAttendee = function() {
		if ($scope.attendee.first == null || $scope.attendee.last == null)
			return;
		$scope.attendee.isMember = false;
		$scope.attendee.drinks = 0;
		$mdDialog.hide($scope.attendee);
	}
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	$scope.attendee = {};
});

appControllers.controller('attendanceDialogController', function($scope, $mdDialog, user){
	$scope.hide = function(){
		$scope.user.drinks = parseInt($scope.user.drinks);
		$mdDialog.hide();
	}
	$scope.user = user;
});

function makeDownload(data, filename){
	var downloadLink = document.createElement('a');
	document.body.appendChild(downloadLink);
	downloadLink.style = 'display: none;';
	var dataUrl = window.URL.createObjectURL(data);
	downloadLink.href = dataUrl;
	downloadLink.download = filename;
	downloadLink.click();
	downloadLink.remove();
}

appControllers.controller('reportController', function($scope, userService) {
	$scope.getAttendees = userService.getAttendees;
	$scope.downloadAttendeesJson = function() {
		var data = new Blob([JSON.stringify({attendees : $scope.getAttendees().all()})], {type: 'application/json'});
		makeDownload(data, 'attendees.json');
	}
	$scope.totalBBQ = function() { return userService.getAttendees().all().filter(p => p.boughtBBQ).length; }
	$scope.totalDrinks =  function() {
		var d = 0;
		var data = userService.getAttendees().all();
		for  (var i = 0; i < data.length; i++)
			d += data[i].drinks;
		return d;
	}
	$scope.downloadAttendeesCsv = function() {
		var output = "FirstName,LastName,Access,BoughtBBQ,Drinks\n";
		var data = userService.getAttendees().all();
		for (var i = 0; i < data.length; i++){
			var p = data[i];
			output += [p.first, p.last, p.access, p.boughtBBQ, p.drinks].join(',') + '\n';
		}
		//summary data
		output += "\n";
		output += "TotalAttendees," + data.length + "\n";
		output += "Access," + userService.getAttendees().access().length + "\n";
		output += "NonAccess," + userService.getAttendees().nonAccess().length + "\n";
		output += "AccessBBQ," + userService.getAttendees().access().filter(member => (member.boughtBBQ)).length;
		output += ",,NonAccessBBQ," + userService.getAttendees().nonAccess().filter(member => (member.boughtBBQ)).length + "\n";
		output += "TotalDrinks," + $scope.totalDrinks() + "\n";

		outputBlob = new Blob([output], {type:'text/csv'});
		makeDownload(outputBlob, 'attendees.csv');
	}
});
