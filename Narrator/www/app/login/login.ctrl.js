'use strict';
narrator.controller('Login', function($scope, $cordovaFacebook,$location){
    $scope.isLogin = true;
    $scope.facebookLogin = function () {
        $cordovaFacebook.login(["public_profile"]).then(function (success) {
            $scope.loginInfo = success;

        }, function (error) {
            $scope.error = error;
            alert(error);
        })
    };

    $scope.login = function () {
        $location.path('/dashboard');
    };

    $scope.logout = function () {
        $cordovaFacebook.logout().then(function (success) {
            console.log(success);
        }, function (error) {
            $scope.error = error;
            alert(error);
        })
    };
});

