var narrator = angular.module('narrator', ['ngCordova','ui.router'])
    .run(function ($rootScope, $cordovaNetwork, $cordovaBatteryStatus, $cordovaLocalNotification, $cordovaPush,$http,API_URL,API) {
        
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            $cordovaLocalNotification.registerPermission().then(function () {
                //alert("registered");
            }, function () {
                //alert("denied registration");
            });

            var iosConfig = {
                "badge": true,
                "sound": true,
                "alert": true
            };
            $cordovaPush.register(iosConfig).then(function (result) {
                //alert("device token: " + result.deviceToken);
            }, function (error) {
                //alert("error " + error);
            });

            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                if (notification.alert) {
                    navigator.notification.alert(notification.alert);
                }
                if (notification.sound) {
                    var snd = new Media(event.sound);
                    snd.play();
                }
                if (notification.badge) {
                    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                        // Success!
                    }, function (err) {
                        // An error occurred. Show a message to the user
                    });
                }
            });


            $rootScope.$on("$cordovaNetwork:offline", function (event, result) {
                alert("Device is now Offline!");
            });


            $rootScope.$on("$cordovaNetwork:online", function (event, result) {
                alert("Device is Online!");
            });

            $rootScope.$on("$cordovaBatteryStatus:status", function (event, status) {
                //alert("status: " + status);
            })

    })

    .constant('API_URL', {
            points_interest : 'https://servicesstg.universalorlando.com/api/PointsOfInterest'
    })
    .constant('API', {
        key : 'Hackathon1',
        token : '9ebc55c9-b5e4-4695-83c5-ade19ea6df4c'
    })
    .config(function($stateProvider, $urlRouterProvider){

        document.addEventListener("deviceready", function () {}, false);

        $stateProvider
            .state('login',{url:'/',templateUrl:'login/login.html'})
            .state('dashboard',{url:'/dashboard',templateUrl:'login/login.html'})

        $urlRouterProvider.otherwise('/dashboard')
    });
