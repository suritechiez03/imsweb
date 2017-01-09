/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.controller('manageproductCtrl',
        ['$scope', '$timeout', '$log', '$mdMedia', 'ManageProductService','AlertService',
            function ($scope, $timeout, $log, $mdMedia, ManageProductService,AlertService) {
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
                            AlertService.showAlert(this,"Info","New Product Category Added Successfully","OK");
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
                            AlertService.showAlert(this,"Info","New Product Added Successfully","OK");
                            clearproduct();
                        });
                    }
                    if ($scope.SAVE_UPDATE_DELETE_FLAG === "Update") {

                    }

                };




            }]);


