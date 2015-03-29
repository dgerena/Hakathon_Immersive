'use strict';
narrator.controller('Landing', function($scope,$location){


    $scope.obj = {
        id: 1,
        name: 'Stuff',
        description: 'jhgkabj jkhgnjkbanej knjkn; jknag vjhn ;n ;erga;n;kng bkjn lkng; an;lkn;l na rvln;lnlnl brehanb ;lkn q;'
    };
    $scope.onDragComplete=function(data,evt){
        console.log("drag success, data:", data);
    };
    $scope.onDropComplete=function(data,evt){
        console.log("drop success, data:", data);
        $location.path('/info')
    }

});

