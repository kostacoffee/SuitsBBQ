var appServices = angular.module('appServices', []);

appServices.service('userService', function($http){
	this.getUsers = function() {
		return $http({
			method: 'GET',
			url: 'https://suits:electric@members.suits.org.au/query',
			withCredentials: true
		}).then(function(response) {
			return response.data.members; 
		});
	}
});