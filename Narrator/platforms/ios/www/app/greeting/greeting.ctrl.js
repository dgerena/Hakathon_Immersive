angular.module('demo.greeting.ctrl', [])

    .controller('GreetingCtrl', function ($scope,$http,$resource) {
        $scope.login = '';

        $resource('http://45.55.162.87:3000/users/login?email=:email&password=:password',{
            'email': "dick123@gmail.com",
            'password':'zxcvbnm9'
        },{
            get:{
                method:'get'
            }
        })

            .success(function(data){
                //$scope.beacon = data;
                $scope.user = data;
            });


    });
