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
            });
    // nested states 
    // each of these sections will have their own view
    // url will be nested (/form/profile)
//            .state('form.profile', {
//                url: '/profile',
//                templateUrl: 'form-profile.html'
//            })
//            // route for the index page
////        .when('/', {
////                templateUrl : 'pages/login.html',
////                controller  : 'loginCtrl'
////        })
//
//            // route for the FAQ page
//            .when('/home', {
//                templateUrl: 'pages/home.html',
//                controller: 'homeCtrl'
//            })
    $urlRouterProvider.otherwise('/');
    

});

//phpro.controller('mainCtrl', function($scope) {
//        // create a message to display in our view
////        $scope.heading = 'Welcome to PHPRO.ORG';
////        $scope.message = 'Here you will find the meaning of life.';
//});
       