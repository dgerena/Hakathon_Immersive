angular.module('demo.sqlite.ctrl', [])

  .controller('SqliteCtrl', function ($scope, $log, $cordovaToastshow,$http) {

        $scope.url = '45.55.162.87:3000/users/visit/f32d5b0b-542b-4548-b852-4dcbb100388d';

        $http.get($scope.url)
            .success(function(data){
                $cordovaToastshow(data, 'long', 'center')
                    .then(function (success) {
                        console.log("center msg displayed");
                    }, function (error) {
                        $scope.msg = error.message;
                    });
            })

  });
