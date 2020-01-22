angular.module('rdb')

.controller('SearchProjectsCtrl', function($scope, $http,DTOptionsBuilder, DTColumnBuilder){

	$scope.requiredValues = true;

	$scope.searchProject = function(){

		console.log($scope);

		var fp = $scope.fp;
		var descripcion = $scope.descripcion;
		var desde = new Date($scope.desde.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
		var hasta = new Date($scope.hasta.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
		hasta.setDate(hasta.getDate() + 1);

		if(fp) {

			$http({
				method: 'GET',
				url: '/projects/fp/'+fp
			}).then(function(response){
				$scope.projects = response.data;
				if(!response.data) {
					alert("No hay resultados con este FP registrados");
				}
			},function(error){
				console.log(error);
			});

		} else if(descripcion && desde && hasta) {

			$http({
				method: 'GET',
				url: '/projects/descripcion/'+descripcion+'/'+desde.toISOString()+'/'+hasta.toISOString()
			}).then(function(response){
				$scope.projects = response.data;
			},function(error){
				console.log(error);
			});

		} else {
			$scope.requiredValues = false;
			alert("Se requieren el FP o todos los campos marcados");
		}

		//console.log($scope);
	}

	/*
	$http({
		method: 'GET',
		url: '/projects'
	}).then(function(response){
		$scope.projects = response.data;
	},function(error){
		console.log(error);
	});
	*/

	var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource($scope.projects)
        .withDOM('frtip')
        .withPaginationType('full_numbers')
        // Active Buttons extension
        .withButtons([
            {extend: 'colvis',
             text: 'Habilitar columnas'
        	},
            {extend: 'copy',
             text: 'Copiar'
        	},
            {extend: 'print',
             text: 'Imprimir'
        	},
            'excel',
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'A3'
            }
        ])
        .withLanguageSource('//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Spanish.json')

})


.controller('AddProjectCtrl', ['$scope','$http','$window', function($scope,$http,$window){


	$scope.requiredValues = true;

	$scope.addProject = function() {

		if(!$scope.no_secuencia || !$scope.descripcion || !$scope.tipo || !$scope.solicitante || !$scope.gerente
		|| !$scope.fecha_recibido || !$scope.unidad || !$scope.lugar) {
			$scope.requiredValues = false;
		} else {

		$scope.requiredValues = true;

		  var data = {
		    reg_date: 				new Date(),
		    nosecuencial: 			$scope.no_secuencia,
		    descripcion: 			$scope.descripcion,
		    tipo: 					$scope.tipo,
		    solicitante: 			$scope.solicitante,
		    gerente: 				$scope.gerente,
		    lider: 					$scope.lider,
		    unidad_planta: 			$scope.unidad,
		    lugar: 					$scope.lugar,
		    costo_estimado: 		$scope.costo_estimado,
		    costo_aprobado: 		$scope.costo_aprobado,
		    fp: 					$scope.fp,
		    comentario: 			$scope.comentario,
		    estado: 				$scope.estado,
		    ejecutante: 			$scope.ejecutante,
		    fecha_recibido: 		$scope.fecha_recibido,
		    fecha_para_aprobacion: 	$scope.fecha_para_aprobacion,
		    fecha_aprobado: 		$scope.fecha_aprobado
		  };
		  
		  $http({
				method: 'POST',
				url: '/projects',
				data: data
			}).then(function(data, status){
				console.log(data);
			},function(error){
				console.log(error);
			});

			$window.location.href = '/index.html';
			
	}
	
	}
	
}])

.controller('UpdateProjectCtrl', ['$scope','$http','$window', function($scope,$http,$window){

	$scope.requiredValues = true;
	$scope.foundedProject = true;

	$scope.searchProject = function(){

		var fp = $scope.fpSearch;

		if(fp) {

			$http({
				method: 'GET',
				url: '/projects/fp/'+fp
			}).then(function(response){
				$scope.projects = response.data;
				$scope.id = response.data[0]._id;
				$scope.no_secuencia = response.data[0].nosecuencial;
				$scope.descripcion = response.data[0].descripcion;
				$scope.tipo = response.data[0].tipo;
				$scope.solicitante = response.data[0].solicitante;
				$scope.gerente = response.data[0].gerente;
				$scope.lider = response.data[0].lider;
				$scope.unidad = response.data[0].unidad_planta;
				$scope.lugar = response.data[0].lugar;
				$scope.costo_estimado = response.data[0].costo_estimado;
				$scope.costo_aprobado = response.data[0].costo_aprobado;
				$scope.fp = response.data[0].fp;
				$scope.comentario = response.data[0].comentario;
				$scope.estado = response.data[0].estado;
				$scope.ejecutante = response.data[0].ejecutante;
				$scope.fecha_recibido = new Date(response.data[0].fecha_recibido).toLocaleDateString('en-GB');
				$scope.fecha_para_aprobacion = new Date(response.data[0].fecha_para_aprobacion).toLocaleDateString('en-GB');
				$scope.fecha_aprobado = new Date(response.data[0].fecha_aprobado).toLocaleDateString('en-GB');

				$('#datepicker1').datepicker({
		            uiLibrary: 'bootstrap4',
		            format: 'dd/mm/yyyy',
		            locale: 'es-es'
		        });

		        $('#datepicker2').datepicker({
		            uiLibrary: 'bootstrap4',
		            format: 'dd/mm/yyyy',
		            locale: 'es-es'
		        });

		        $('#datepicker3').datepicker({
		            uiLibrary: 'bootstrap4',
		            format: 'dd/mm/yyyy',
		            locale: 'es-es'
		        });

		        $scope.foundedProject = false;
		        
				if(!response.data) {
					alert("No hay resultados con este FP registrados");
				}
			},function(error){
				console.log(error);
			});

		} else {
			$scope.requiredValues = false;
			alert("Se requiere llenar el campo");
		}
	};

	$scope.updateProject = function(){

		if(!$scope.no_secuencia || !$scope.descripcion || !$scope.tipo || !$scope.solicitante || !$scope.gerente
		|| !$scope.fecha_recibido || !$scope.unidad || !$scope.lugar) {
			$scope.requiredValues = false;
		} else {

		$scope.requiredValues = true;

		  var data = {
		  	id: 					$scope.id,
		    nosecuencial: 			$scope.no_secuencia,
		    descripcion: 			$scope.descripcion,
		    tipo: 					$scope.tipo,
		    solicitante: 			$scope.solicitante,
		    gerente: 				$scope.gerente,
		    lider: 					$scope.lider,
		    unidad_planta: 			$scope.unidad,
		    lugar: 					$scope.lugar,
		    costo_estimado: 		$scope.costo_estimado,
		    costo_aprobado: 		$scope.costo_aprobado,
		    fp: 					$scope.fp,
		    comentario: 			$scope.comentario,
		    estado: 				$scope.estado,
		    ejecutante: 			$scope.ejecutante,
		    fecha_recibido: 		new Date($scope.fecha_recibido.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3")),
		    fecha_para_aprobacion: 	new Date($scope.fecha_para_aprobacion.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3")),
		    fecha_aprobado: 		new Date($scope.fecha_aprobado.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"))
		  };
		  
		  $http({
				method: 'PUT',
				url: '/projects',
				data: data
			}).then(function(data, status){
				console.log(data);
			},function(error){
				console.log(error);
			});

			$window.location.href = '/index.html';
			
	}

	};

}])

.controller('testCtrl', function($scope,$http,$window){

	console.log("test Ctrl instantiated");

});
