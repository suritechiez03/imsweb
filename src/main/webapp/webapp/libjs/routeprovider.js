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
                controller: 'homeCtrl'
            })
            .state('home.adddealer', {
                url: '/adddealer',
                templateUrl: 'pages/AddDealerPage.html',
                controller: 'homeCtrl'
            })
            .state('home.addsupplier', {
                url: '/addsupplier',
                templateUrl: 'pages/AddSupplierPage.html',
                controller: 'homeCtrl'
            })
            .state('home.addauthorizer', {
                url: '/addauthorizer',
                templateUrl: 'pages/AddAuthorizerPage.html',
                controller: 'homeCtrl'
            })
            .state('home.manageproduct', {
                url: '/manageproduct',
                templateUrl: 'pages/ManageProduct.html',
                controller: 'homeCtrl'
            })
            .state('home.manageorder', {
                url: '/manageorder',
                templateUrl: 'pages/ManageOrders.html',
                controller: 'homeCtrl'
            })
            .state('home.manageinvoice', {
                url: '/manageinvoice',
                templateUrl: 'pages/ManageInvoice.html',
                controller: 'homeCtrl'
            })
            .state('home.managetransaction', {
                url: '/managetransaction',
                templateUrl: 'pages/ManageTransaction.html',
                controller: 'homeCtrl'
            });

    $urlRouterProvider.otherwise('/');
    

});
