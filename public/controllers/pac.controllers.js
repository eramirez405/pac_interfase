angular.module('rdb')

.controller('inspectIO-Ctrl', function($scope,$http,$window){
	
	$scope.showOutForm = true;

	$scope.GetPac = function(){

		if($scope.tipo) {

			$http({
				method: 'GET',
				url: '/pac/get/inputType/'+ $scope.tipoIO +'/'+$scope.tipo
			}).then(function(data, status){

				if(data){
					$scope.results = JSON.parse(data.data);
					$scope.resultsLength = JSON.parse(data.data).length;
					if(JSON.parse(data.data).length === 0) {
						alert('El controlador no tiene ninguna entrada tipo ' + $scope.tipo);
					}
					if(($scope.tipoIO === 'output') && ($scope.resultsLength > 0)) {
						$scope.showOutForm = false;
					} else {
						$scope.showOutForm = true;
					}
				} else {
					console.log('No data found');
				}
				
				},function(error){
					console.log(error);
					alert('Internal error, contact support!');
			});

			if($scope.tipo === "digital") {
				$scope.booleanInput = true;
				$scope.numericInput = false;
			} else if ($scope.tipo === "analog") {
				$scope.booleanInput = false;
				$scope.numericInput = true;
			} else {
				alert('No se ha seleccionado un tipo');
			}

		} else {
			alert('No ha seleccionado el tipo de entrada a buscar');
		}

	};

	$scope.SetPac = function() {
		if($scope.nameIO) {

			if($scope.booleanInput && $scope.booleanInput === true) {

				$http({
					method: 'GET',
					url: 'pac/post/digitalOutput/'+ $scope.nameIO +'/'+$scope.booleanValue
				}).then(function(data, status){

					if(data){

						if(JSON.parse(data.data).errorCode === 0) {
							alert(JSON.parse(data.data).message);
							$scope.GetPac();
						} else {
							alert(JSON.parse(data.data).message);
							$scope.GetPac();
						}
						console.log(data);

					} else {
						console.log('No data found');
					}
					
					},function(error){
						console.log(error);
						alert('Internal error, contact support!');
				});

			} else if ($scope.numericInput && $scope.numericInput === true) {

				$http({
					method: 'GET',
					url: 'pac/post/analogOutput/'+ $scope.nameIO +'/'+$scope.numericValue
				}).then(function(data, status){

					if(data){

						if(JSON.parse(data.data).errorCode === 0) {
							alert(JSON.parse(data.data).message);
							$scope.GetPac();
						} else {
							alert(JSON.parse(data.data).message);
							$scope.GetPac();
						}

					} else {
						console.log('No data found');
					}
					
					},function(error){
						console.log(error);
						alert('Internal error, contact support!');
				});

			} else {
				alert('No se ha definido el valor de ' + $scope.nameIO);
			}

		} else {
			alert("No ha seleccionado la salida");
		}

	};
	
	

})

.controller('inspectTable-Ctrl', function($scope,$http,$window){ 

	$scope.tableTypeSelected = function() {

		if($scope.tableType) {

			$http({
					method: 'GET',
					url: 'pac/get/tables/'+ $scope.tableType
				}).then(function(data, status){

					if(data){

						$scope.tableListResults = JSON.parse(data.data);

					} else {
						console.log('No data found');
					}
					
					},function(error){
						console.log(error);
						alert('Internal error, contact support!');
				});

		} else {
			alert('No table type has been selected');
		}

	}

	$scope.GetTable = function() {

		if($scope.tableList) {

			$http({
					method: 'GET',
					url: 'pac/get/tables/'+ $scope.tableType + '/' + $scope.tableList
				}).then(function(data, status){

					if(data){

						var tableListed = JSON.parse(data.data);

						//console.log(JSON.parse(data.data));
						//console.log(typeof JSON.parse(data.data));
						//console.log(['err','piii']);
						var arr = [];
						for (var i = 0; i < tableListed.length; i++) {
							if(tableListed[i] !== "") {
								arr.push({index:i,msg:tableListed[i]})
								
							}
						}
						$scope.tableListed = arr;
						console.log(arr);
						//$scope.tableListResults = JSON.parse(data.data);
						console.log($scope)
					} else {
						console.log('No data found');
					}
					
					},function(error){
						console.log(error);
						alert('Internal error, contact support!');
				});

		} else {
			alert('No table has been selected');
		}

	}

})

.controller('inspectVariables-Ctrl', function($scope,$http,$window){ 

	$scope.GetVariable = function() {

		if($scope.variableType) {

			$http({
					method: 'GET',
					url: 'pac/get/vars/'+ $scope.variableType
				}).then(function(data, status){

					if(data){

						$scope.variablesListed = JSON.parse(data.data);

						//console.log(JSON.parse(data.data));
						//console.log(typeof JSON.parse(data.data));

						//$scope.tableListResults = JSON.parse(data.data);

						console.log($scope.variablesListed)
					} else {
						console.log('No data found');
					}
					
					},function(error){
						console.log(error);
						alert('Internal error, contact support!');
				});

		} else {
			alert('No table has been selected');
		}

	}

});