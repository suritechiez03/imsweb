/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.controller('manageproductCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'ManageProductService','AlertService',
            function ($scope, $timeout, $log, $mdMedia, ManageProductService,AlertService) {
                $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                $scope.selected = [];
                var clearproductcategory = function () {
                    $scope.ProductCategory = null;
                };
                var clearproduct = function () {
                    $scope.Product= null;
                };
                $scope.listproductcategory = function () {

                    console.log("Listing product category info");
                    ManageProductService.getProductCategoryList(function (response) {
                        $scope.ProductCategoryList = JSON.parse(JSON.stringify(response));
                    });
                };
                $scope.SaveOrUpdateProductCategory = function () {
                    var data = JSON.stringify($scope.ProductCategory);
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save") {
                        ManageProductService.addProductCategory(data, function (response) {
                            AlertService.showAlert(this,"Info","New Product Category Added Successfully","OK");
                            clearproductcategory();
                        });
                    }
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update") {
                        
                    }

                };
                $scope.loadProducts= function(){
                ManageProductService.getProductList(function (response) {
                    console.log(JSON.stringify(response));
                    $scope.productlist = response;
                });
                };
                $scope.updateProduct=function(data){
                    $scope.selectedIndex=1;
                    $scope.listproductcategory();
                    $scope.Product=data;
                    $scope.SAVE_UPDATE_DELETE_FLAG="Update";
                     
                };
                $scope.SaveOrUpdateProduct = function () {
                    var data = JSON.stringify($scope.Product);
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save") {
                        ManageProductService.addProduct(data, function (response) {
                            AlertService.showAlert(this,"Info","New Product Added Successfully","OK");
                            clearproduct();
                        });
                    }
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update") {
                        ManageProductService.updateProduct(data, function (response) {
                            AlertService.showAlert(this,"Info","Product updated Successfully","OK");
                            clearproduct();
                            $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                            $scope.selectedIndex=2;
                        });
                    }

                };




            }]);


