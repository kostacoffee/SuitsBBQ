var appServices = angular.module('appServices', []);

appServices.service('userService', function($http){
	var members = [];
	this.getUsers = function() {
		return $http({
			method: 'GET',
			url: 'https:/members.suits.org.au/query',
			withCredentials: true
		}).then(function(response) {
			members = response.data.members;
			for (var i = 0; i < members.length; i++){
				var member = members[i];
				delete member.degree;
				delete member.year;
				delete member.gets_newsletter;
				delete member.level;
				delete member.international;
				delete member.when_joined;
				delete member.email;
				member.boughtBBQ = false;
				member.drinks = 0;
				member.isMember = true;
			}
			return members;
		});
	}

	this.getAttendees = function() {
		return{
			all : function() {
				return members.filter(member => (member.drinks > 0 || member.boughtBBQ));
			},
			members : function() {
				return this.all().filter(member => (member.isMember));
			},
			nonMembers: function() {
				return this.all().filter(member => (!member.isMember));
			},
			nonAccess: function() {
				return this.all().filter(member => (member.access == null));
			},
			access: function() {
				return this.all().filter(member => (member.access != null));
			}
		}
	}
});
