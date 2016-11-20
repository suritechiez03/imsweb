/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.controller('manageproductCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'ManageProductService',
            function ($scope, $timeout, $log, $mdMedia, ManageProductService) {
                $scope.SAVE_UPDATE_DELETE_FLAG = "Save";
                var clearproductcategory = function () {
                    $scope.ProductCategory = null;
                };
                var clearproduct = function () {
                    $scope.ProductCategory = null;
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
                            alert("Added New Product Category " + response);
                            clearproductcategory();
                        });
                    }
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update") {

                    }

                };
                $scope.SaveOrUpdateProduct = function () {
                    var data = JSON.stringify($scope.Product);
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Save") {
                        ManageProductService.addProduct(data, function (response) {
                            alert("Added New Product " + response);
                            clearproduct();
                        });
                    }
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update") {

                    }

                };




            }]);


