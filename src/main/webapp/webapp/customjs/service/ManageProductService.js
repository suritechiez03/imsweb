/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('ManageProductService',
        ['$http', '$cookieStore', '$rootScope', '$timeout', 'AlertService',
            function ($http, $cookieStore, $rootScope, $timeout, AlertService) {
                var service = {};
                service.addProductCategory = function (data, callback) {
                    $http.post('/IMSWEB/addProductCategory', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product category added successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("product category added unsuccessfully...........................");
                                AlertService.showAlert(this, "Info", "Unable Add Product Category", "OK");
                            });
                };
                service.updateProductCategory = function (data, callback) {
                    $http.post('/IMSWEB/updateProductCategory', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product category update successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("product category update unsuccessfully...........................");
                                AlertService.showAlert(this, "Info", "Unable Update Product Category", "OK");
                            });
                };
                service.getProductCategoryList = function (callback) {
                    $http.get('/IMSWEB/getProductCategoryList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                AlertService.showAlert(this, "Info", "Unable get Product Category", "OK");
                            });
                };
                service.addProduct = function (data, callback) {
                    $http.post('/IMSWEB/addProduct', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product added successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("product added unsuccessfully...........................");
                                AlertService.showAlert(this, "Info", "Unable add Product details", "OK");
                            });
                };
                service.updateProduct = function (data, callback) {
                    $http.post('/IMSWEB/updateProduct', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product update successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("product update unsuccessfully...........................");
                                AlertService.showAlert(this, "Info", "Unable Update Product details", "OK");
                            });
                };
                service.getProductList = function (callback) {
                    $http.get('/IMSWEB/getProductList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                AlertService.showAlert(this, "Info", "Unable retrive Product details", "OK");
                            });
                };
                service.getStockdetails = function (data, callback) {
                    $http.post('/IMSWEB/getStockdetails', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {

                                callback(response);
                            })
                            .error(function (response) {
                                AlertService.showAlert(this, "Info", "Unable retrive stock details", "OK");
                            });
                };
                service.isStockAvailable = function (data, orderqty,callback) {
                    $http.post('/IMSWEB/getStockdetails', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                if (response.availableQty >= orderqty)
                                {
                                    callback(true);
                                    
                                } else {
                            
                                AlertService.showAlert(this, "Info", "Stock Not Available", "OK");
                            
                                }
//                                callback(response);
                            })
                            .error(function (response) {
                                AlertService.showAlert(this, "Info", "Unable retrive stock details", "OK");
                            });
                };
                return service;
            }]);
