/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
materialApp
.controller('materialUpdateFileCtrl', function materialCtrl($scope, $http, $routeParams, $filter, $sce, $timeout, Upload) {
	'use strict';

	$scope.path = '';
	$scope.file = '';
	$scope.lessPaths = lessPaths;


	$scope.upload = function(file) {

		file.upload = Upload.upload({
			url: '/material/update-file',
			data: { file: file, path: $scope.path }
		});

		file.upload.then(function (response) {
			$timeout(function () {
				file.result = response.data;

				var r = confirm(response.data.message);
				if (r == true) {
				    location.reload();
				} else {
				    location.reload();
				}
			});
		},

		function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
		},

		function (evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		});
	};

});