/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
materialApp
.controller('materialCtrl', function materialCtrl($scope, $http, $routeParams, $filter, $sce) {
	'use strict';

	$scope.code = '';
	$scope.categories = categories;
	$scope.version = version;
	$scope.material = {};
	$scope.collection = '';
	$scope.items = [];

	// Set and get the list to render a collection
	if( $routeParams.collection ){

		$scope.collection = $.grep(categories, function(e){ return e.key == $routeParams.collection; });
		
		if( $scope.collection != -1 )
			$scope.collection = $scope.collection[0];
		else
			return;

		$http.get('/material/list/' + $scope.collection.key ).then(
			function successCallback(response){
				$scope.items = response.data;
			},

			function errorCallback(response){
				console.log(response);
			}
		);
	}


	// Find and object when id is defined
	if( $routeParams.id ){
		
		$scope.material.id = $routeParams.id;

		$http.get( 'material/' + $scope.material.id ).then(
			function successCallback(response){
				$scope.material = response.data;
			},

			function errorCallback(response){
				console.log(response);
			}
		);

	}

	$scope.create = function(){

		$http.post( '/material', $scope.material ).then(
			function successCallback(response) {
				alert("Material insertado correctamente");
				$scope.material = {};
			},
			function errorCallback(response) {
				console.log(response);
		});
	}


	$scope.update = function(){

		if( ! $scope.material._id )
			return;

		console.log($scope.material);

		$http.put( '/material/' + $scope.material._id, $scope.material ).then(
			function successCallback(response) {
				alert("Material actualizado correctamente");
			},
			function errorCallback(response) {
				console.log(response);
		});
	}

	$scope.delete = function(){

		if( ! $scope.material._id )
			return;

		$http.delete( '/material/' + $scope.material._id ).then(
			function successCallback(response) {
				alert(response.message);
				$scope.material = {};
			},
			function errorCallback(response) {
				console.log(response);
		});
	}

});