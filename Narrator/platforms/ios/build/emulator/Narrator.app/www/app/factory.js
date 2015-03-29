narrator.factory('Auth', function($http, $rootScope, $window, Session, AUTH_EVENTS,API_URL, $location) {
        var authService = {};

        //the login function
        authService.login = function(user, success, error) {

            var req = {
                method: 'POST',
                url: API_URL.url+'Users/authenticate',
                headers: {
                    'Content-Type': undefined
                },
                data: user
            };

            $http(req)
                .success(function(data, status, headers, config) {
                    var users = data.data;
                    if(data.success){
                        Session.create(users);
                    } else {
                        $location.path('/');
                    }
                })
                .error(function(data, status, headers, config) {

                });

        };

        //check if the user is authenticated
        authService.isAuthenticated = function() {
            return !!Session.user;
        };

        //log out the user and broadcast the logoutSuccess event
        authService.logout = function(){
            Session.destroy();
        };

        return authService;
    });