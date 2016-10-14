

imsappctrl.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$http', '$mdSidenav', '$mdDialog', '$timeout', 'AuthenticationService',
    function ($scope, $rootScope, $location, $http, $mdSidenav, $mdDialog, $timeout, AuthenticationService) {
        $scope.toggleLeft = buildDelayedToggler('left');
        //initService.callme();

        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            
            return function debounced() {
                var context = $scope,
                        args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
            }, 200);
        }
        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
            }
        }
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        $scope.logOut = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                    .title('Hi ,')
                    .textContent('Would you like log out?')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Log-Out')
                    .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                //$scope.status = 'You decided to get rid of your debt.';
                AuthenticationService.LogOut();
                $location.path("index");

            }, function () {
                //$scope.status = 'You decided to keep your debt.';
            });
        };

    }]);

imsappctrl.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
    };
});




