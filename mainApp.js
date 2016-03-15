var app = angular.module('main', ['ngMaterial', 'ngMdIcons', 'appServices', 'appControllers'])
.run(function($rootScope, $mdSidenav){
	$rootScope.toggleNav = function() {
		$mdSidenav('left').toggle();
	}
});

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