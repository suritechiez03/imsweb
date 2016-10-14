/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


imsappctrl.controller('authorizerCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'authorizerService', 'dealerService', 'supplierService',
            function ($scope, $timeout, $log, $mdMedia, authorizerService, dealerService, supplierService) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $scope.selectedTab = 1;
                $scope.Authorizer = {};
                $scope.Authorizer.authorizerFor = '';
                $scope.AuthorizerForOption = ('Dealer Supplier').split(' ').map(function (state) {
                    return {abbrev: state};
                });
                $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                $scope.listsupplierordealer = function () {
                    if ($scope.Authorizer.authorizerFor === "Dealer") {
                        console.log("Listing " + $scope.Authorizer.authorizerFor + " info");
                        dealerService.getDealerList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"dealerNumber":').join('"supplierdealerno":'));
                            $scope.getAuthorizerNo();
                        });
                    }
                    if ($scope.Authorizer.authorizerFor === "Supplier") {
                        console.log("Listing " + $scope.Authorizer.authorizerFor + " info");
                        supplierService.getSupplierList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"supplierNumber":').join('"supplierdealerno":'));
                            $scope.getAuthorizerNo();
                        });
                    }
                };
                $scope.getAuthorizerNo = function () {

//                    $scope.DealerSupplierlist = {};
//                    if ($scope.Authorizer.authorizerFor === "Dealer") {
//                        console.log("Listing " + $scope.Authorizer.authorizerFor + " info");
//                        dealerService.getDealerList(function (response) {
//                            $scope.DealerSupplierlist = response;
////                            $scope.getAuthorizerNo();
//                        });
////                        $scope.getAuthorizerNo();
//                    }
//                    if ($scope.Authorizer.authorizerFor === "Supplier") {
//                        console.log("Listing " + $scope.Authorizer.authorizerFor + " info");
//                        supplierService.getSupplierList(function (response) {
//                            $scope.DealerSupplierlist = response;
////                            $scope.getAuthorizerNo();
//                        });
////                        $scope.getAuthorizerNo();
//                    }
                    authorizerService.getAuthorizerNo($scope.Authorizer.authorizerFor, function (response) {

                        $scope.Authorizer = {
                            authorizerId: response,
                            authorizername: "www.TestCompany.com",
                            phoneno: "123456789",
                            emailid: "TIN001",
                            pannumber: "CST01",
                            otherDetails: "ASDF1234S",
                            authorizerFor: $scope.Authorizer.authorizerFor



                        };
                        $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                    });

                };
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
                $scope.cancel = function () {

                };
                $scope.getDealerAuthorizerList = function () {

                    $scope.Authorizer.authorizerFor = "Dealer";
                    authorizerService.getDealerAuthorizerList(function (response) {
                        $scope.Authorizerslist = response;
                    });
                };
                $scope.getSupplierAuthorizerList = function () {

                    $scope.Authorizer.authorizerFor = "Supplier";
                    authorizerService.getSupplierAuthorizerList(function (response) {
                        $scope.Authorizerslist = response;
                    });
                };
                $scope.SaveOrUpdate = function () {
                    console.log($scope.Authorizer.dealerorsupplierno);
                    var data = angular.toJson($scope.Authorizer, null);
                    alert(data);
                    if ($scope.Authorizer.authorizerFor === "Dealer") {
                        if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save")
                            authorizerService.addNewDealerAuthorizer(data, function (response) {
                                alert("New Authorizer Added " + response);
                                $scope.Authorizer = null;
                                $scope.getAuthorizerNo();
                            });

                        if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update")
                            authorizerService.updateDealerAuthorizer(data, function (response) {
                                alert("Authorizer Info Updated " + response);
//                                $scope.Authorizer = null;
//                                $scope.Authorizer.authorizerFor="Dealer";
                                $scope.selectedIndex = 1;
                            });
                    }
                    if ($scope.Authorizer.authorizerFor === "Supplier") {
                        if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save")
                            authorizerService.addNewSupplierAuthorizer(data, function (response) {
                                alert("New Authorizer Added " + response);
//                                $scope.Authorizer = null;
                                $scope.getAuthorizerNo();
                            });

                        if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update")
                            authorizerService.updateSupplierAuthorizer(data, function (response) {
                                alert("Authorizer Info Updated " + response);
//                                $scope.Authorizer = null;
//                                $scope.Authorizer.authorizerFor="Supplier";
                                $scope.selectedIndex = 1;
                            });
                    }
                };
                $scope.init = function () {
                    $scope.getAuthorizerNo();
                };
                $scope.editAuthorizerInfo = function (data) {
                    $scope.SAVE_UPDATE_DELETE_FLAG = "Update";
                    console.log("selected for edit" + JSON.stringify(data));
                    $scope.Authorizer = data;
                    if (data.dealerorsupplierno.includes("DE")) {
                        $scope.Authorizer.authorizerFor = "Dealer";

                        dealerService.getDealerList(function (response) {
                            $scope.DealerSupplierlist = '';
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"dealerNumber":').join('"supplierdealerno":'));
                            $scope.Authorizer.dealerorsupplierno = data.dealerorsupplierno;
                            ;
                        });

                    }
                    if (data.dealerorsupplierno.includes("SE")) {
                        $scope.Authorizer.authorizerFor = "Supplier";

                        supplierService.getSupplierList(function (response) {
                            $scope.DealerSupplierlist = '';
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"supplierNumber":').join('"supplierdealerno":'));
                            $scope.Authorizer.dealerorsupplierno = data.dealerorsupplierno;
                            ;
                        });

                    }
                    $scope.selectedIndex = 0;
                };
                $scope.checkForNUllValues = function (Data) {
                    ///not yet implemented 
                };

            }]);


