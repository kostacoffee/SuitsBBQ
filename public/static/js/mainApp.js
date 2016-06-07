var app = angular.module('main', ['ngMaterial', 'appServices', 'appControllers', 'firebase'])

app.config(function($mdIconProvider) {
	$mdIconProvider.defaultIconSet('/static/material-icons.svg');
})

app.filter('capitalize', function() {
	return function(input) {
		if (!!input){
			var names = input.split(' ');
			for (var i = 0; i < names.length; i++){
				names[i] = names[i].charAt(0).toUpperCase() + names[i].substr(1).toLowerCase();
			}
			return names.join(' ');
		}
	}
});
