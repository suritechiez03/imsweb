// create the module and name it phpro
// also include ngRoute for all our routing needs
//phpro=angular.module('imsapp',['ngRoute']);

// configure our routes
imsappctrl.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl'

            })
            .state('home', {
                url: '/home',
                templateUrl: 'pages/home.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin','User']
                }
//                resolve: { //Here we would use all the hardwork we have done
//                //above and make call to the authorization Service
//                //resolve is a great feature in angular, which ensures that a route
//                //controller (in this case superUserController ) is invoked for a route
//                //only after the promises mentioned under it are resolved.
//                permission: function(AuthorizationService, $route) {
//                    return AuthorizationService.permissionCheck([roles.admin,roles.user,roles.cashier]);
//                }
                //}
            })
            .state('home.adddealer', {
                url: '/adddealer',
                templateUrl: 'pages/AddDealerPage.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }
            })
            .state('home.addsupplier', {
                url: '/addsupplier',
                templateUrl: 'pages/AddSupplierPage.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }
            })
            .state('home.addauthorizer', {
                url: '/addauthorizer',
                templateUrl: 'pages/AddAuthorizerPage.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }

            })
            .state('home.manageproduct', {
                url: '/manageproduct',
                templateUrl: 'pages/ManageProduct.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }
            })
            .state('home.manageorder', {
                url: '/manageorder',
                templateUrl: 'pages/ManageOrders.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }
            })
            .state('home.manageinvoice', {
                url: '/manageinvoice',
                templateUrl: 'pages/ManageInvoice.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin','Cashier']
                }
            })
            .state('home.managetransaction', {
                url: '/managetransaction/{InvoiceNo}',
                templateUrl: 'pages/ManageTransaction.html',
                controller: 'homeCtrl',
                data: {
                    roles: ['Admin']
                }
            });
    $urlRouterProvider.otherwise('/');


});
