'use strict';
narrator.controller('Landing', function($scope){
    $scope.obj = {
        id: 1,
        name: 'Stuff',
        description: 'jhgkabj jkhgnjkbanej knjkn; jknag vjhn ;n ;erga;n;kng bkjn lkng; an;lkn;l na rvln;lnlnl brehanb ;lkn q;'
    };
    $scope.onDropComplete=function(data,evt,node){
            console.log(evt);
            console.log(node);
    };

});

