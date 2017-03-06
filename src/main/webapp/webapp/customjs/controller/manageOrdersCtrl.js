/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.controller('manageOrdersCtrl',
        ['$scope','$rootScope', '$timeout', '$mdDialog', '$log', '$mdMedia','$location', 'ManageOrderService', 'dealerService', 'supplierService', 'ManageProductService', 'AlertService',
            function ($scope,$rootScope, $timeout, $mdDialog, $log, $mdMedia,$location, ManageOrderService, dealerService, supplierService, ManageProductService, AlertService) {
                $scope.selectedproductlist = [];
                $scope.ManageOrder = {products: ''};
                $scope.productlist ={stockdetails:''};
                
                $scope.selected = [];
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
                $scope.AddtoCart = function (product, qty) {
                    console.log(product);
//                    product.stockdetail
                    product.orderQuantity = qty;
                    if ($scope.selectedproductlist.indexOf(product) === -1){
                          if ($scope.ManageOrder.OrderFor === "Dealer") {
                            ManageProductService.isStockAvailable(product.productcode, product.orderQuantity, function (response) {
                                if(response){
                                $scope.selectedproductlist.push(product);
                                $scope.orderQuantity = 0;
                            }
                            });

                        }
                        if ($scope.ManageOrder.OrderFor === "Supplier") {

                            $scope.selectedproductlist.push(product);
                            $scope.orderQuantity = 0;

                        }
//                        $scope.selectedproductlist.push(product);
//                        $scope.orderQuantity = 0;
                    }else{
                        AlertService.showAlert(this,"","Item Already Exists","OK");
                    }
                    
                    console.log($scope.selectedproductlist);
                };
                $scope.Remove = function (productIndex) {
                    $scope.selectedproductlist.splice(productIndex, 1);
                };
                $scope.saveOrder = function () {
//                    console.log($scope.selectedproductlist);
                    $scope.ManageOrder.products = $scope.selectedproductlist;
//                    console.log(JSON.stringify($scope.ManageOrder));
                    ManageOrderService.takeOrder($scope.ManageOrder, function (response, orderno) {
//                        console.log(order     no);
                        if (response == "OK") {
                            AlertService.showAlert(this, "New Order", "Order " + orderno.GeneratedOrderNo + " has been recived Successfully for " + $scope.ManageOrder.dealerorsupplierno, "ok");
                            $scope.selectedproductlist = [];
                            $scope.ManageOrder.products = [];
                        } else {
                            AlertService.showAlert(this, "New Order", "Unable to Recive order for " + $scope.ManageOrder.dealerorsupplierno, "ok");
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
                };
                $scope.loadOrders = function () {
                    ManageOrderService.getOrders(function (response) {
                        console.log(JSON.stringify(response));
                        $scope.orderlist = response;
                    });
//                    $scope.orderlist=ManageOrderService.getOrders();
                };
                
                $scope.viewproducts = function (ev) {
                    console.log(ev);
                    $scope.ordprdlist=ev;
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'pages\\templates\\ViewProductList.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                            .then(function (answer) {

                            }, function () {

                            });
                };
                function DialogController($scope, $mdDialog) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function (answer) {
                        $mdDialog.hide(answer);
                    };
                };
                $scope.gotoInvoice=function(){
                    $location.path("/home/manageinvoice");
                };

            }]);

