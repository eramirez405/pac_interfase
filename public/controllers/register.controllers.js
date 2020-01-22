angular.module('rdb')

.controller('RegisterCtrl', function($scope, $http, $window){

	$scope.requiredValues = true;

	$scope.addUser = function() {

		if(!$scope.name || !$scope.lastname || !$scope.email || !$scope.user || !$scope.password1
		|| !$scope.password2) {
			$scope.requiredValues = false;

		} else if ($scope.password1 !== $scope.password2){

			alert("Las contraseñas no coinciden");
		} else {

		$scope.requiredValues = true;

		  var data = {
		    reg_date: 		new Date(),
		    name: 			$scope.name,
		    lastname: 		$scope.lastname,
		    email: 			$scope.email,
		    user: 			$scope.user,
		    password1: 		$scope.password1
		  };
		  
		  $http({
				method: 'POST',
				url: '/users',
				data: data
			}).then(function(data, status){
				console.log(data);
			},function(error){
				console.log(error);
			});

			$window.location.href = '/index.html';
			}
	}
})

.controller('mainCtrl', function($scope, $http, $window){

	$scope.login = function(){
		if(!$scope.username || !$scope.password) {
			alert("info missing");
		} else {


		  var data = {
		    username: 		$scope.username,
		    password: 			$scope.password
		  };

		  $http({
				method: 'POST',
				url: '/users/login',
				data: data
			}).then(function(data, status){
				console.log(data);
			},function(error){
				console.log(error);
			});

			$window.location.href = '/index.html';

		  console.log(data);
		}
	}

});
