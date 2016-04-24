/*global angular */

/**
 * The main PulzoMaterial app module
 *
 * @type {angular.Module}
 */
var materialApp = angular.module('materialApp', ['ngRoute', 'hljs', "ngSanitize", "textAngular", 
	"ngclipboard", "angular.chosen", "ngFileUpload"])
.config(function ($routeProvider, hljsServiceProvider) {
	'use strict';

	hljsServiceProvider.setOptions({
		// replace tab with 4 spaces
		tabReplace: '    '
	});

	var routeConfig = {
		controller: 'indexCtrl',
		templateUrl: './app/templates/material-intro.html'
	};

	var materialInsertConfig = {
		controller: 'materialCtrl',
		templateUrl: './app/templates/material/insert.html'
	};


	var materialEditConfig = {
		controller: 'materialCtrl',
		templateUrl: './app/templates/material/edit.html'
	};


	var materialItemsConfig = {
		controller: 'materialCtrl',
		templateUrl: function($stateParams){

			if( $stateParams.collection == 'colors' )
				return './app/templates/material/list-colors.html';

			return './app/templates/material/list.html';
		}
	};

	var materialUpdateFileConfig = {
		controller: 'materialUpdateFileCtrl',
		templateUrl: './app/templates/material/update-file.html'
	};

	$routeProvider
		.when('/', routeConfig)
		.when('/material/insert', materialInsertConfig)
		.when('/material/edit/:id', materialEditConfig)
		.when('/material/items/:collection', materialItemsConfig)
		.when('/material/update-file', materialUpdateFileConfig)
		.when('/:status', routeConfig)
		.otherwise({
			redirectTo: '/'
	});
});
