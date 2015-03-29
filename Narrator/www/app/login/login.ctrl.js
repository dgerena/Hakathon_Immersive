'use strict';
narrator.controller('Login', function($scope, $cordovaOauth){
    $scope.login = true;
    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("CLIENT_ID_HERE", ["email"]).then(function(result) {
            // results
        }, function(error) {
            // error
        });
    }
});

