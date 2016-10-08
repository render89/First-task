// Code goes here
var app = angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'tasklist.html',
        controller: 'taskListController'
      })
      .when('/tasks/:taskid/:someShit', {
        templateUrl: 'task.html',
        controller: 'taskDetailsController'
      });
    
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
  })
  .controller('mainController', function($scope, $location, $routeParams) {
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  })
  .controller('taskListController', function($scope){
    //model след строка
    $scope.tasks = window.tasks
    $scope.tasksFiltered = $scope.tasks.filter(function(zadacha){
      return zadacha.obj_status === 'active';
    })
    //.sort(function(task1, task2){
      // return new Date(task1.creation_date) - new Date(task2.creation_date)
    // })
  })
  .controller('taskDetailsController', function($scope, $routeParams, $http) {
    // $scope.task = window.tasks.find({id: $routeParams.taskId});
    window.tasks.forEach(function(task) {
      if (task.id == $routeParams.taskid) {
        $scope.task = task;
      }
    });
    
    $scope.nameEditable = false;
    
    $scope.changeName = function(){
      $scope.nameEditable = true;
    };
    $scope.saveName = function(){
      $scope.nameEditable = false;
      $http({method: 'GET', data: $scope.task, url: 'task.html'})
        .then(function(response){
          $scope.data = response.data;
          $scope.status = response.status;
          })
        .catch(function(error){
           $scope.error = JSON.stringify(error);
           $scope.error = error;
        })
    }
  });