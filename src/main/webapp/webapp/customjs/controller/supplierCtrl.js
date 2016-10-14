/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


imsappctrl.controller('supplierCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'supplierService',
            function ($scope, $timeout, $log, $mdMedia, supplierService) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $scope.selectedTab = 1;
                $scope.Supplier = {};
                $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                $scope.getSupplierNo = function () {
                    supplierService.getSupplierNo(function (response) {

                        $scope.Supplier = {
                            supplierNumber: response,
                            companyName: "TestCompany",
                            companyWebsite: "www.TestCompany.com",
                            companyEmail: "TestCompany@email.com",
                            tinNumber: "TIN001",
                            cstNumber: "CST01",
                            panNumber: "ASDF1234S",
                            comapanyAddress: "TestCompanyAdress",
                            offlicePhNumber: "999999"

                        };
                    });
                };

                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });


                $scope.cancel = function () {

                };
                $scope.getSupplierList = function () {
                    console.log("listing supplier")
                    supplierService.getSupplierList(function (response) {
                        $scope.Supplierslist = response;
                    });
                }
                $scope.SaveOrUpdate = function () {
                    var data = angular.toJson($scope.Supplier, null);
                    alert(data);
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save")
                        supplierService.addNewSupplier(data, function (response) {
                            alert("New Supplier Added " + response);
                            $scope.Supplier = null;
                            $scope.getSupplierNo();

                        });
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update")
                        supplierService.updateSupplier(data, function (response) {
                            alert("Supplier Info Updated " + response);
                            $scope.Supplier = null;
                            $scope.selectedIndex = 1;

                        });
                };
                $scope.init = function () {
                    $scope.getSupplierNo();
                };
                $scope.editSupplierInfo = function (data) {
                    $scope.SAVE_UPDATE_DELETE_FLAG = "Update";
                    console.log("selected for edit" + data.supplierNumber);
                    $scope.Supplier = data;
                    $scope.selectedIndex = 0;

                }
                $scope.checkForNUllValues = function (Data) {
                    if (!angular.isDefined(Data.supplierNumber) ||
                            !angular.isDefined(Data.companyName) ||
                            !angular.isDefined(Data.companyWebsite) ||
                            !angular.isDefined(Data.companyEmail) ||
                            !angular.isDefined(Data.cstNumber) ||
                            !angular.isDefined(Data.tinNumber) ||
                            !angular.isDefined(Data.offlicePhNumber) ||
                            !angular.isDefined(Data.comapanyAddress)) {

                        return false;

                    } else {
                        return true;
                    }
                }

            }]);

