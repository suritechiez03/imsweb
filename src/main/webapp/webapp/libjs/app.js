// create the module and name it phpro
// also include ngRoute for all our routing needs
var imsappctrl = angular.module('imsapp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngCookies', 'ngStorage','md.data.table']);
imsappctrl.run(['$templateCache', function ($templateCache) {
        $templateCache.removeAll();
    }]);



imsappctrl.config(function ($mdThemingProvider,$httpProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.cache = false;

});
