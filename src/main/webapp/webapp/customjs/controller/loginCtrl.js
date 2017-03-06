/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools |  Templates
 * and open the template in the editor.
 */
/* global imsappctrl */

//angular.module('imsapp', ['ngMaterial'])
imsappctrl.controller('loginCtrl',
        ['$scope', '$rootScope', '$location', '$window', '$sessionStorage', '$cookieStore', 'AuthenticationService', 'initService',
            function ($scope, $rootScope, $location, $window, $sessionStorage, $cookieStore, AuthenticationService, initService) {
                // reset login status
                AuthenticationService.ClearCredentials();
                initService.callme();
                $scope.login = function () {

                    //$scope.dataLoading = true;
                    if (angular.isDefined($scope.username) && angular.isDefined($scope.password)) {
                        AuthenticationService.Login($scope.username, $scope.password, function (response) {

                            if (response.token !== '') {
                                AuthenticationService.SetCredentials($scope.username, $scope.password);
                                console.log(response);
                                $location.path(response.loginparam); //log in to main page
                                $cookieStore.put('UserName',response.UserName);
                                $rootScope.UserName = $cookieStore.get('UserName');

                            } else {
                                $scope.error = response.message;
                                //$scope.dataLoading = false;

                            }
                        });
                    } else
                    {
                        $scope.error = "User Name and Password cannot be blank";
                    }
                };
                $scope.getAppSettings = function () {
                    console.log("i am here");
                    initService.getAppsettings('', function (response) {
                        console.log("i am here");
                        console.log(response[0].appValue);
//                $scope.AppTitle=response[0].appKey;
                        $cookieStore.put('AppTitle', response[0].appValue);
                        $cookieStore.put('AppDescription', response[1].appValue);
                        $rootScope.AppTitle = $cookieStore.get('AppTitle');
                        $rootScope.AppDescription =$cookieStore.get('AppDescription'); ;
                        $sessionStorage.AppTitle = response[0].appValue;
                        console.log($sessionStorage.AppTitle);
                        //      $rootscope.AppTitle=response[0].appKey;
                    });
                };
                $scope.init = function () {
                    // check if there is query in url
                    // and fire search in case its value is not empty
                    getAppSettings();
                };


            }]);
