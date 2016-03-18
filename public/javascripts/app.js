angular.module('socketDemo', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeController'
      }).
      when('/shows/:show', {
        templateUrl: '/partials/show.html',
        controller: 'ShowsController'
      }).
      otherwise({
        redirectTo: '/'
      });
  })
  .controller('HomeController', function ($scope) {

    // io is a global object given to you by /socket.io/socket.io.js
    var socket = io();
    $scope.messages = [];
    $scope.tacoMessages = [];

    // when the _server_ sends a message
    // we'll add that message to our $scope.messages array
    socket.on('message', function (data) {
      $scope.messages.push(data);

      // use $scope.apply in order to make sure the view is updated
      // even though this event was fired outside of Angular's digest
      $scope.$apply();
    })

    $scope.self = function () {
      // this sends a message to the server
      // with the name of "self"
      $scope.tacoMessages = $scope.form.message
      console.log($scope.tacoMessages)

      socket.emit('self', $scope.tacoMessages);
    }

    $scope.all = function () {
      $scope.tacoMessages = $scope.form.message
      // this sends a message to the server
      // with the name of "all"
      socket.emit('all', $scope.tacoMessages);
    }

    $scope.broadcast = function () {
      $scope.tacoMessages = $scope.form.message
      // this sends a message to the server
      // with the name of "broadcast"
      socket.emit('broadcast', $scope.tacoMessages);
    }

    // The $destroy event is triggered when the controller is about to go away
    // For example when you move to another route
    $scope.$on('$destroy', function (event) {
      // since the global io object is reused, all the event listeners from
      // above will remain until the page is reloaded.

      // So clean up by removing all listeners
      socket.removeAllListeners();
    });

  })
  .controller('ShowsController', function($scope, $routeParams, $http) {

    $scope.show = $routeParams.show;
    var socket = io();

    // when the user first lands on this route
    // immediately send a message to the server with a dynamic room name taken
    // from the $routeParams.

    // The server will then tell this client to join the room specified here.
    socket.emit('join', { showName: $routeParams.show });
    $scope.showMessage = []
    $scope.messages = [];
    socket.on('message', function (data) {
      $scope.messages.push(data);
      $scope.$apply();
    })

      $http.get('/messages').then(function (response) {
        console.log(response)
      $scope.stories = response.data

  })
    $scope.sendMessage = function () {
      $scope.showMessage = $scope.form.message
      socket.emit('message', $scope.showMessage);
    }

    $scope.broadcastRoom = function () {
      $scope.showMessage = $scope.form.message
      socket.emit('broadcastRoom', $scope.showMessage);
    }

    $scope.$on('$destroy', function (event) {
      socket.removeAllListeners();
    });
    });


