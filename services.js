var appServices = angular.module('appServices', []);

appServices.service('userService', function($http){
	var members = [];
	this.getUsers = function() {
		return $http({
			method: 'GET',
			url: 'https://suits:UfKSdkWGD91x2j52BkaJ173EpM0H2ePW@members.suits.org.au/query',
			withCredentials: true
		}).then(function(response) {
			members = response.data.members;
			for (var i = 0; i < members.length; i++){
				var member = members[i];
				member.boughtBBQ = false;
				member.drinks = 0;
				if (member.access == null)
					member.access = 'NO ACCESS';
			}
			return members; 
		});
	}

	this.updateMember = function(member){
		var toUpdate = members.filter(function(m){m.sid=member.sid});
		toUpdate = member;
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