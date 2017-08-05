// create the module and name it phpro
// also include ngRoute for all our routing needs
var imsappctrl = angular.module('imsapp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngCookies', 'ngStorage', 'md.data.table']);
imsappctrl.run(['$templateCache', '$rootScope', '$location', 'AuthenticationService', function ($templateCache, $rootScope, $location, AuthenticationService) {
        $rootScope.globals = {
                        currentUser: {
                            username: "",
                            authdata: "",
                            role:"",
                            authtoken:"",
                            isAuthenticated:false
                        }
                    }
        $templateCache.removeAll();
        $rootScope.$on('$locationChangeStart', function (event, toState, toStateParams) {
            console.log(toStateParams);
            // Check if current user has group access
            if (!$rootScope.globals.currentUser.isAuthenticated && !AuthenticationService.userHasRole(toStateParams.roles)) {
                $location.path('/');
            }
        })
    }]);
var roles = {
    admin: 0,
    user: 1,
    cashier: 2
};

var routeForUnauthorizedAccess = '/SomeAngularRouteForUnauthorizedAccess';


imsappctrl.config(function ($mdThemingProvider, $httpProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();

    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.cache = false;

});
