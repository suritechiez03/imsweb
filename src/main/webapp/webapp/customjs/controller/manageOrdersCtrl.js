/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.controller('manageOrdersCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'ManageOrderService', 'dealerService', 'supplierService', 'ManageProductService','AlertService',
            function ($scope, $timeout, $log, $mdMedia, ManageOrderService, dealerService, supplierService, ManageProductService,AlertService) {
                $scope.selectedproductlist = [];
                $scope.OrderForOption = ('Dealer Supplier').split(' ').map(function (state) {
                    return {abbrev: state};
                });
                $scope.searchTerm;
                $scope.clearSearchTerm = function () {
                    $scope.searchTerm = '';
                };
                $scope.listsupplierordealer = function () {
                    if ($scope.ManageOrder.OrderFor === "Dealer") {
                        console.log("Listing " + $scope.ManageOrder.OrderFor + " info");
                        dealerService.getDealerList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"dealerNumber":').join('"supplierdealerno":'));

                        });
                    }
                    if ($scope.ManageOrder.OrderFor === "Supplier") {
                        console.log("Listing " + $scope.ManageOrder.OrderFor + " info");
                        supplierService.getSupplierList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"supplierNumber":').join('"supplierdealerno":'));

                        });
                    }
                };
                $scope.next = function (currentindex) {
                    $scope.selectedIndex = $scope.selectedIndex + 1;
                    ($scope.selectedIndex === 2) ? loadProducts() : "";
                    $scope.ManageOrder.isTab2Enabled = ($scope.selectedIndex === 2) ? true : false;

                };
                $scope.loadProducts = function () {
                    ManageProductService.getProductList(function (response) {
                        console.log(JSON.stringify(response));
                        $scope.productlist = response;
                    });
                };
                $scope.AddtoCart = function (product) {
                    $scope.selectedproductlist.push(product);
                    console.log($scope.selectedproductlist);
                };
                $scope.saveOrder = function () {
                    $scope.ManageOrder.products = $scope.selectedproductlist;
                    console.log(JSON.stringify($scope.ManageOrder));
                    ManageOrderService.takeOrder($scope.ManageOrder, function (response) {
                        if(response=="OK"){
                        AlertService.showAlert(this,"New Order","Order has been recived Successfully for " + $scope.ManageOrder.dealerorsupplierno,"ok");
                    }else{
                        AlertService.showAlert(this,"New Order","Unable to Recive order for " + $scope.ManageOrder.dealerorsupplierno,"ok");
                    }
                        
                    });
                };

                $scope.getTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.selectedproductlist.length; i++) {
                        var product = $scope.selectedproductlist[i];
                        total += (product.price * product.orderQuantity);
                    }
                    return total;
                }

            }]);

