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

/*global angular */

/**
 * The main controller for the app. The controller:
 */
materialApp
.controller('indexCtrl', function indexCtrl($scope, $routeParams, $filter) {
	'use strict';	
});

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
/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
// angular.module('todomvc')
// 	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
// 		'use strict';

// 		var todos = $scope.todos = store.todos;

// 		$scope.newTodo = '';
// 		$scope.editedTodo = null;

// 		$scope.$watch('todos', function () {
// 			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
// 			$scope.completedCount = todos.length - $scope.remainingCount;
// 			$scope.allChecked = !$scope.remainingCount;
// 		}, true);

// 		// Monitor the current route for changes and adjust the filter accordingly.
// 		$scope.$on('$routeChangeSuccess', function () {
// 			var status = $scope.status = $routeParams.status || '';

// 			$scope.statusFilter = (status === 'active') ?
// 				{ completed: false } : (status === 'completed') ?
// 				{ completed: true } : null;
// 		});

// 		$scope.addTodo = function () {
// 			var newTodo = {
// 				title: $scope.newTodo.trim(),
// 				completed: false
// 			};

// 			if (!newTodo.title) {
// 				return;
// 			}

// 			$scope.saving = true;
// 			store.insert(newTodo)
// 				.then(function success() {
// 					$scope.newTodo = '';
// 				})
// 				.finally(function () {
// 					$scope.saving = false;
// 				});
// 		};

// 		$scope.editTodo = function (todo) {
// 			$scope.editedTodo = todo;
// 			// Clone the original todo to restore it on demand.
// 			$scope.originalTodo = angular.extend({}, todo);
// 		};

// 		$scope.saveEdits = function (todo, event) {
// 			// Blur events are automatically triggered after the form submit event.
// 			// This does some unfortunate logic handling to prevent saving twice.
// 			if (event === 'blur' && $scope.saveEvent === 'submit') {
// 				$scope.saveEvent = null;
// 				return;
// 			}

// 			$scope.saveEvent = event;

// 			if ($scope.reverted) {
// 				// Todo edits were reverted-- don't save.
// 				$scope.reverted = null;
// 				return;
// 			}

// 			todo.title = todo.title.trim();

// 			if (todo.title === $scope.originalTodo.title) {
// 				$scope.editedTodo = null;
// 				return;
// 			}

// 			store[todo.title ? 'put' : 'delete'](todo)
// 				.then(function success() {}, function error() {
// 					todo.title = $scope.originalTodo.title;
// 				})
// 				.finally(function () {
// 					$scope.editedTodo = null;
// 				});
// 		};

// 		$scope.revertEdits = function (todo) {
// 			todos[todos.indexOf(todo)] = $scope.originalTodo;
// 			$scope.editedTodo = null;
// 			$scope.originalTodo = null;
// 			$scope.reverted = true;
// 		};

// 		$scope.removeTodo = function (todo) {
// 			store.delete(todo);
// 		};

// 		$scope.saveTodo = function (todo) {
// 			store.put(todo);
// 		};

// 		$scope.toggleCompleted = function (todo, completed) {
// 			if (angular.isDefined(completed)) {
// 				todo.completed = completed;
// 			}
// 			store.put(todo, todos.indexOf(todo))
// 				.then(function success() {}, function error() {
// 					todo.completed = !todo.completed;
// 				});
// 		};

// 		$scope.clearCompletedTodos = function () {
// 			store.clearCompleted();
// 		};

// 		$scope.markAll = function (completed) {
// 			todos.forEach(function (todo) {
// 				if (todo.completed !== completed) {
// 					$scope.toggleCompleted(todo, completed);
// 				}
// 			});
// 		};
// 	});

/*global angular */

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
// angular.module('todomvc')
// 	.directive('todoEscape', function () {
// 		'use strict';

// 		var ESCAPE_KEY = 27;

// 		return function (scope, elem, attrs) {
// 			elem.bind('keydown', function (event) {
// 				if (event.keyCode === ESCAPE_KEY) {
// 					scope.$apply(attrs.todoEscape);
// 				}
// 			});

// 			scope.$on('$destroy', function () {
// 				elem.unbind('keydown');
// 			});
// 		};
// 	});

/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
// angular.module('todomvc')
// 	.directive('todoFocus', function todoFocus($timeout) {
// 		'use strict';

// 		return function (scope, elem, attrs) {
// 			scope.$watch(attrs.todoFocus, function (newVal) {
// 				if (newVal) {
// 					$timeout(function () {
// 						elem[0].focus();
// 					}, 0, false);
// 				}
// 			});
// 		};
// 	});

/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
// angular.module('todomvc')
// 	.factory('todoStorage', function ($http, $injector) {
// 		'use strict';

// 		// Detect if an API backend is present. If so, return the API module, else
// 		// hand off the localStorage adapter
// 		return $http.get('/api')
// 			.then(function () {
// 				return $injector.get('api');
// 			}, function () {
// 				return $injector.get('localStorage');
// 			});
// 	})

// 	.factory('api', function ($http) {
// 		'use strict';

// 		var store = {
// 			todos: [],

// 			clearCompleted: function () {
// 				var originalTodos = store.todos.slice(0);

// 				var completeTodos = [];
// 				var incompleteTodos = [];
// 				store.todos.forEach(function (todo) {
// 					if (todo.completed) {
// 						completeTodos.push(todo);
// 					} else {
// 						incompleteTodos.push(todo);
// 					}
// 				});

// 				angular.copy(incompleteTodos, store.todos);

// 				return $http.delete('/api/todos')
// 					.then(function success() {
// 						return store.todos;
// 					}, function error() {
// 						angular.copy(originalTodos, store.todos);
// 						return originalTodos;
// 					});
// 			},

// 			delete: function (todo) {
// 				var originalTodos = store.todos.slice(0);

// 				store.todos.splice(store.todos.indexOf(todo), 1);

// 				return $http.delete('/api/todos/' + todo.id)
// 					.then(function success() {
// 						return store.todos;
// 					}, function error() {
// 						angular.copy(originalTodos, store.todos);
// 						return originalTodos;
// 					});
// 			},

// 			get: function () {
// 				return $http.get('/api/todos')
// 					.then(function (resp) {
// 						angular.copy(resp.data, store.todos);
// 						return store.todos;
// 					});
// 			},

// 			insert: function (todo) {
// 				var originalTodos = store.todos.slice(0);

// 				return $http.post('/api/todos', todo)
// 					.then(function success(resp) {
// 						todo.id = resp.data.id;
// 						store.todos.push(todo);
// 						return store.todos;
// 					}, function error() {
// 						angular.copy(originalTodos, store.todos);
// 						return store.todos;
// 					});
// 			},

// 			put: function (todo) {
// 				var originalTodos = store.todos.slice(0);

// 				return $http.put('/api/todos/' + todo.id, todo)
// 					.then(function success() {
// 						return store.todos;
// 					}, function error() {
// 						angular.copy(originalTodos, store.todos);
// 						return originalTodos;
// 					});
// 			}
// 		};

// 		return store;
// 	})

// 	.factory('localStorage', function ($q) {
// 		'use strict';

// 		var STORAGE_ID = 'todos-angularjs';

// 		var store = {
// 			todos: [],

// 			_getFromLocalStorage: function () {
// 				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
// 			},

// 			_saveToLocalStorage: function (todos) {
// 				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
// 			},

// 			clearCompleted: function () {
// 				var deferred = $q.defer();

// 				var completeTodos = [];
// 				var incompleteTodos = [];
// 				store.todos.forEach(function (todo) {
// 					if (todo.completed) {
// 						completeTodos.push(todo);
// 					} else {
// 						incompleteTodos.push(todo);
// 					}
// 				});

// 				angular.copy(incompleteTodos, store.todos);

// 				store._saveToLocalStorage(store.todos);
// 				deferred.resolve(store.todos);

// 				return deferred.promise;
// 			},

// 			delete: function (todo) {
// 				var deferred = $q.defer();

// 				store.todos.splice(store.todos.indexOf(todo), 1);

// 				store._saveToLocalStorage(store.todos);
// 				deferred.resolve(store.todos);

// 				return deferred.promise;
// 			},

// 			get: function () {
// 				var deferred = $q.defer();

// 				angular.copy(store._getFromLocalStorage(), store.todos);
// 				deferred.resolve(store.todos);

// 				return deferred.promise;
// 			},

// 			insert: function (todo) {
// 				var deferred = $q.defer();

// 				store.todos.push(todo);

// 				store._saveToLocalStorage(store.todos);
// 				deferred.resolve(store.todos);

// 				return deferred.promise;
// 			},

// 			put: function (todo, index) {
// 				var deferred = $q.defer();

// 				store.todos[index] = todo;

// 				store._saveToLocalStorage(store.todos);
// 				deferred.resolve(store.todos);

// 				return deferred.promise;
// 			}
// 		};

// 		return store;
// 	});

materialApp.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

materialApp.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});

materialApp.filter('escapeHtml', function () {

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    return function(str) {
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }
});