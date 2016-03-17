var appServices = angular.module('appServices', []);

appServices.service('userService', function($http){
	var members = [];
	this.getUsers = function() {
		return $http({
			method: 'GET',
			url: 'https://suits:electric@members.suits.org.au/query',
			withCredentials: true
		}).then(function(response) {
			members = response.data.members;
			for (var i = 0; i < members.length; i++){
				var member = members[i];
				member.boughtBBQ = true;
				member.drinks = 0;
				if (member.access == null)
					member.access = 'NO ACCESS';
			}
			return members; 
		});
	}
	this.getAttendees = function() {
		var attendees = []
		for (var i = 0; i < members.length; i++){
			var member = members[i];
			if (member.boughtBBQ || member.drinks > 0){
				attendees.push(member);
			}
		}
		return attendees;
	}
});