/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


imsappctrl.controller('dealerCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'dealerService',
            function ($scope, $timeout, $log, $mdMedia, dealerService) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $scope.selectedTab = 1;
                $scope.Dealer = {};
                $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                $scope.getDealerNo = function () {
                    dealerService.getDealerNo(function (response) {

                        $scope.Dealer = {
                            dealerNumber: response,
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
                $scope.getDealerList = function () {
                    dealerService.getDealerList(function (response) {
                        $scope.Dealerslist = response;
                    });
                };
                $scope.SaveOrUpdate = function () {
                    var data = angular.toJson($scope.Dealer, null);
                    alert(data);
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save")
                        dealerService.addNewDealer(data, function (response) {
                            alert("New Dealer Added " + response);
                            $scope.Dealer = null;
                            $scope.getDealerNo();

                        });
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update")
                        dealerService.updateDealer(data, function (response) {
                            alert("Dealer Info Updated " + response);
                            $scope.Dealer = null;
                            $scope.selectedIndex = 1;

                        });
                };
                $scope.init = function () {
                    $scope.getDealerNo();
                };
                $scope.editDealerInfo = function (data) {
                    $scope.SAVE_UPDATE_DELETE_FLAG = "Update";
                    console.log("selected for edit" + data.dealerNumber);
                    $scope.Dealer = data;
                    $scope.selectedIndex = 0;

                }
                $scope.checkForNUllValues = function (Data) {
                    if (!angular.isDefined(Data.dealerNumber) ||
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

