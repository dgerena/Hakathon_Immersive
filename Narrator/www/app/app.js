var narrator = angular.module('narrator', ['ngCordova'])
    .run(['$rootScope', function ($rootScope){

    }])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('login',{url:'/',templateUrl:'login/login.html'})
    });
