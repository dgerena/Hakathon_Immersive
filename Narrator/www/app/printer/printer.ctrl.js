angular.module('demo.printer.ctrl', [])

  .controller('PrinterCtrl', function ($scope, $timeout, $cordovaDialogs, $location) {


        $timeout(function(){ $scope.alert() },5000);

        $scope.alert = function () {
            $scope.action = "Alert";
            var note = $cordovaDialogs.alert("You've reach an Universal Studios interactive Beacon!",'Beacon Alert');
            if(note){
                $location.path('/landing')
            }
        };
  });
