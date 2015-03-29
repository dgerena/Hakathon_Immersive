angular.module('demo.greeting.ctrl', [])

    .controller('GreetingCtrl', function ($scope,$http) {
        $scope.login = '';

        $http.get('http://45.55.162.87:3000/users/login?email=dick123@gmail.com&password=zxcvbnm9').success(function(data){console.log(data)})



    });
