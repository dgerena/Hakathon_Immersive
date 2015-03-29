angular.module('demo.greeting.ctrl', [])

    .controller('GreetingCtrl', function ($scope,$http,$rootScope,$location) {
        $scope.login = {};
        //email=dick123@gmail.com&password=zxcvbnm9
        //email=rob@robmail.com&password=zxcvbnm9
    $scope.signin = function(){
        $http.get('http://45.55.162.87/users/login?email='+$scope.login.email+'&password='+$scope.login.password).success(function(data){
            $rootScope.user = data.user;
            $rootScope.user.isLogged = true;
            if(!$rootScope.user.active){
                $location.path('/printer')
            } else {
                $location.path('/landing')
            }
        })
    }




    });
