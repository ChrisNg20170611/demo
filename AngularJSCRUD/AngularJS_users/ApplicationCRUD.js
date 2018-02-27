// also include ngRoute for all our routing needs
//var appIndex = angular.module('MyAppCrud',[]);
var appIndex = angular.module('MyAppCrud', ['ngRoute'

]);

// configure  routes
/*
appIndex.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'listUsers.htm',
        controller: 'ListUsersController'
    });
    $routeProvider.when('/editUser/:user_id', {
        templateUrl: 'editUser.htm',
        controller: 'EditUserController'
    });
    $routeProvider.when('/addUser', {
        templateUrl: 'User/addUser.htm',
        controller: 'AddUserController'
    });
    $routeProvider.otherwise({
        redirectTo: '/addUser'
    });
    $routeProvider.when('/:url', {
        templateUrl: 'User/listUsers.htm',
        controller: 'ListUsersController'
    });

    $locationProvider.html5Mode({enabled:true});
}
]);
*/
appIndex.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
     when('/listUsers', {
        templateUrl: 'Pages/listUsers.htm' 
        ,controller: 'ListUsersController'
     }).
     
     when('/addUser', {
        templateUrl: 'Pages/addUser.htm'
        ,controller: 'AddUserController'
     }).

     when('/editUser/:user_id', {
        templateUrl: 'Pages/editUser.htm' 
        ,controller: 'EditUserController'
     }).

     otherwise({
        redirectTo: '/listUsers'
     });
}]);

appIndex.controller('IndexController', function($scope) {
    $scope.title ='[ApplicationCRUD.js] file with updated date: ';
    $scope.currentDate = new Date().toString();
});