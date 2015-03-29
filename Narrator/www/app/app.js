angular.module('demo', [
  'ionic',
  'ngCordova',
  // modules
  // 'demo.adMob.ctrl',  -- not functioning right now
  'demo.appAvailability.ctrl',
  'demo.appRate.ctrl',
  'demo.barcodeScanner.ctrl',
  'demo.batteryStatus.ctrl',
  'demo.camera.ctrl',
  'demo.clipboard.ctrl',
  'demo.contacts.ctrl',
  'demo.datePicker.ctrl',
  'demo.device.ctrl',
  'demo.deviceMotion.ctrl',
  'demo.deviceOrientation.ctrl',
  'demo.dialogs.ctrl',
  'demo.emailComposer.ctrl',
  'demo.facebook.ctrl',
  'demo.file.ctrl',
  'demo.fileOpener2.ctrl',
  'demo.fileTransfer.ctrl',
  'demo.flashlight.ctrl',
  'demo.geolocation.ctrl',
  'demo.globalization.ctrl',
  'demo.googleAnalytics.ctrl',
  'demo.healthkit.ctrl',
  'demo.inAppBrowser.ctrl',
  'demo.localNotification.ctrl',
  'demo.media.ctrl',
  'demo.network.ctrl',
  'demo.oauth.ctrl',
  'demo.preferences.ctrl',
  'demo.printer.ctrl',
  'demo.pushNotifications.ctrl',
  'demo.socialSharing.ctrl',
  'demo.sqlite.ctrl',
  'demo.statusbar.ctrl',
  'demo.toast.ctrl',
  'demo.touchid.ctrl',
  'demo.loading.ctrl',
  'demo.greeting.ctrl',
  'demo.vibration.ctrl'
])
  .run(function ($rootScope, $ionicPlatform, $cordovaNetwork, $cordovaBatteryStatus, $cordovaLocalNotification, $cordovaPush) {
        window.root = $rootScope;
    $ionicPlatform.ready(function () {
        if($rootScope.user.isLogged){
            $location.path('/landing')
        }
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
  })
  .config(function ($stateProvider, $urlRouterProvider, $cordovaFacebookProvider, $cordovaAppRateProvider, $cordovaInAppBrowserProvider) {

    if (!window.cordova) {
      var appID = 1234567890;
      var version = "v2.0"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, version);
    }

    var browserOptions = {
      location: "yes",
      toolbar: "yes"
    };


    document.addEventListener("deviceready", function(){
        var logToDom = function (message) {
            $scope.label = message;
            window.scrollTo(0, window.document.height);
        };

        var delegate = new window.cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

            window.cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        };

        var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
        var identifier = 'beaconOnTheMacBooksShelf';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        window.cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
        window.cordova.plugins.locationManager.requestWhenInUseAuthorization();
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

        window.cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
    }, false);

    $cordovaInAppBrowserProvider.setDefaultOptions(browserOptions);

        $stateProvider.state('site', {
            'abstract': true,
            resolve: {
                authorize: ['authorization',
                    function(authorization) {
                        return authorization.authorize();
                    }
                ]
            }
        })

      .state('menu', {
        url: "/menu",
        templateUrl: "app/menu.html"
      })

      .state('about', {
        url: "/about",
        templateUrl: "app/about.html"
      })

      .state('appAvailability', {
        url: '/appAvailability',
        templateUrl: 'app/appAvailability/appAvailability.html',
        controller: "AppAvailabilityCtrl"
      })

      .state('appRate', {
        url: '/appRate',
        templateUrl: 'app/appRate/appRate.html',
        controller: "AppRateCtrl"
      })


      .state('barcodeScanner', {
        url: '/barcodeScanner',
        templateUrl: 'app/barcodeScanner/barcodeScanner.html',
        controller: "BarcodeScannerCtrl"
      })

      .state('batteryStatus', {
        url: '/batteryStatus',
        templateUrl: 'app/batteryStatus/batteryStatus.html',
        controller: "BatteryStatusCtrl"
      })

      .state('camera', {
        url: '/camera',
        templateUrl: 'app/camera/camera.html',
        controller: "CameraCtrl"
      })

      .state('clipboard', {
        url: '/clipboard',
        templateUrl: 'app/clipboard/clipboard.html',
        controller: "ClipboardCtrl"
      })

      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/contacts/contacts.html',
        controller: "ContactsCtrl"
      })


      .state('datePicker', {
        url: '/datePicker',
        templateUrl: 'app/datePicker/datePicker.html',
        controller: "DatePickerCtrl"
      })

      .state('device', {
        url: '/device',
        templateUrl: 'app/device/device.html',
        controller: "DeviceCtrl"
      })

      .state('deviceMotion', {
        url: '/deviceMotion',
        templateUrl: 'app/deviceMotion/deviceMotion.html',
        controller: "DeviceMotionCtrl"
      })


      .state('deviceOrientation', {
        url: '/deviceOrientation',
        templateUrl: 'app/deviceOrientation/deviceOrientation.html',
        controller: "DeviceOrientationCtrl"
      })

      .state('dialogs', {
        url: '/dialogs',
        templateUrl: 'app/dialogs/dialogs.html',
        controller: "DialogsCtrl"
      })

      .state('emailComposer', {
        url: '/emailComposer',
        templateUrl: 'app/emailComposer/emailComposer.html',
        controller: "EmailComposerCtrl"
      })

      .state('facebook', {
        url: '/facebook',
        templateUrl: 'app/facebook/facebook.html',
        controller: "FacebookCtrl"
      })

      .state('file', {
        url: '/file',
        templateUrl: 'app/file/file.html',
        controller: "FileCtrl"
      })

      .state('fileTransfer', {
        url: '/fileTransfer',
        templateUrl: 'app/fileTransfer/fileTransfer.html',
        controller: "FileTransferCtrl"
      })

      .state('fileOpener2', {
        url: '/fileOpener2',
        templateUrl: 'app/fileOpener2/fileOpener2.html',
        controller: "FileOpener2Ctrl"
      })

      .state('flashlight', {
        url: '/flashlight',
        templateUrl: 'app/flashlight/flashlight.html',
        controller: "FlashlightCtrl"
      })

      .state('geolocation', {
        url: '/geolocation',
        templateUrl: 'app/geolocation/geolocation.html',
        controller: "GeolocationCtrl"
      })

      .state('globalization', {
        url: '/global',
        templateUrl: 'app/globalization/globalization.html',
        controller: "GlobalizationCtrl"
      })

      .state('googleAnalytics', {
        url: '/googleAnalytics',
        templateUrl: 'app/googleAnalytics/googleAnalytics.html',
        controller: "GoogleAnalyticsCtrl"
      })

      .state('healthkit', {
        url: '/healthkit',
        templateUrl: 'app/healthkit/healthkit.html',
        controller: "HealthKitCtrl"
      })

      .state('inAppBrowser', {
        url: '/inAppBrowser',
        templateUrl: 'app/inAppBrowser/inAppBrowser.html',
        controller: "InAppBrowserCtrl"
      })

      .state('localNotification', {
        url: '/localNotification',
        templateUrl: 'app/localNotification/localNotification.html',
        controller: "LocalNotificationCtrl"
      })

      .state('media', {
        url: '/media',
        templateUrl: 'app/media/media.html',
        controller: "MediaCtrl"
      })

      .state('network', {
        url: '/network',
        templateUrl: 'app/network/network.html',
        controller: "NetworkCtrl"
      })

      .state('oauth', {
        url: '/oauth',
        templateUrl: 'app/oauth/oauth.html',
        controller: "OauthCtrl"
      })

      .state('preferences', {
        url: '/preferences',
        templateUrl: 'app/preferences/preferences.html',
        controller: "PreferencesCtrl"
      })

      .state('printer', {
        url: '/printer',
        templateUrl: 'app/printer/printer.html',
        controller: "PrinterCtrl"
      })

      .state('pushNotifications', {
        url: '/pushNotifications',
        templateUrl: 'app/pushNotifications/pushNotifications.html',
        controller: "PushNotificationsCtrl"
      })

      .state('socialSharing', {
        url: '/socialSharing',
        templateUrl: 'app/socialSharing/socialSharing.html',
        controller: "SocialSharingCtrl"
      })

      .state('sqlite', {
        url: '/sqlite',
        templateUrl: 'app/sqlite/sqlite.html',
        controller: "SqliteCtrl"
      })


      .state('statusbar', {
        url: '/statusbar',
        templateUrl: 'app/statusbar/statusbar.html',
        controller: "StatusbarCtrl"
      })


      .state('toast', {
        url: '/toast',
        templateUrl: 'app/toast/toast.html',
        controller: "ToastCtrl"
      })

      .state('touchid', {
        url: '/touchid',
        templateUrl: 'app/touchid/touchid.html',
        controller: "TouchIDCtrl"
      })

      .state('vibration', {
        url: '/vibration',
        templateUrl: 'app/vibration/vibration.html',
        controller: "VibrationCtrl"
      })

      .state('landing', {
         url: '/landing',
         templateUrl: 'app/landing/landing.html',
         controller: "LandingCtrl"
      })

      .state('greeting', {
            url: '/',
            templateUrl: 'app/greeting/greeting.html',
            controller: "GreetingCtrl"
      });


    $urlRouterProvider.otherwise('/');
  })
    .factory('principal', ['$q', '$http', '$timeout',
        function($q, $http, $timeout) {
            var _identity = undefined,
                _authenticated = false;

            return {
                isIdentityResolved: function() {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function() {
                    return _authenticated;
                },
                isInRole: function(role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function(roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                },
                authenticate: function(identity) {
                    _identity = identity;
                    _authenticated = identity != null;
                    if (identity) localStorage.setItem("demo.identity", angular.toJson(identity));
                    else localStorage.removeItem("demo.identity");
                },
                identity: function(force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                    //                   $http.get('/svc/account/identity', { ignoreErrors: true })
                    //                        .success(function(data) {
                    //                            _identity = data;
                    //                            _authenticated = true;
                    //                            deferred.resolve(_identity);
                    //                        })
                    //                        .error(function () {
                    //                            _identity = null;
                    //                            _authenticated = false;
                    //                            deferred.resolve(_identity);
                    //                        });

                    // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
                    // i put it in a timeout to illustrate deferred resolution
                    var self = this;
                    $timeout(function() {
                        _identity = angular.fromJson(localStorage.getItem("demo.identity"));
                        self.authenticate(_identity);
                        deferred.resolve(_identity);
                    }, 1000);

                    return deferred.promise;
                }
            };
        }
    ])
    .factory('authorization', ['$rootScope', '$state', 'principal',
        function($rootScope, $state, principal) {
            return {
                authorize: function() {
                    return principal.identity()
                        .then(function() {
                            var isAuthenticated = principal.isAuthenticated();

                            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                if (isAuthenticated) $state.go('accessdenied'); // user is signed in but not authorized for desired state
                                else {
                                    // user is not authenticated. stow the state they wanted before you
                                    // send them to the signin state, so you can return them when you're done
                                    $rootScope.returnToState = $rootScope.toState;
                                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                                    // now, send them to the signin state so they can log in
                                    $state.go('signin');
                                }
                            }
                        });
                }
            };
        }
    ])

