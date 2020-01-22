var app = angular.module('rdb',['ngRoute','datatables','datatables.buttons']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/search/projects',{
			templateUrl: 'views/search/projects.view.html',
			controller: 'SearchProjectsCtrl'
		}).
		when('/add/project',{
			templateUrl: 'views/add/projects.view.html',
			controller: 'AddProjectCtrl'
		}).
		when('/update/project',{
			templateUrl: 'views/update/projects.view.html',
			controller: 'UpdateProjectCtrl'
		}).
		when('/',{
			templateUrl: 'views/main.view.html'
		}).
		when('/register',{
			templateUrl: 'views/register.view.html',
			controller: 'RegisterCtrl'
		}).
		when('/test',{
			templateUrl: 'views/test.view.html',
			controller: 'testCtrl'
		}).
		when('/pac/inspectIO',{
			templateUrl: 'views/pac/inspectIO.view.html',
			controller: 'inspectIO-Ctrl'
		}).
		when('/pac/inspectTable',{
			templateUrl: 'views/pac/inspectTable.view.html',
			controller: 'inspectTable-Ctrl'
		}).
		when('/pac/inspectVariables',{
			templateUrl: 'views/pac/inspectVariables.view.html',
			controller: 'inspectVariables-Ctrl'
		}).
		otherwise({redirecTo: '/'})
}])

app.run(function(DTDefaultOptions) {
    // Display 25 items per page by default
    DTDefaultOptions.setDisplayLength(5);
});