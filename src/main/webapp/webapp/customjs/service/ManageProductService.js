/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('ManageProductService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.addProductCategory=function(data,callback){
                $http.post('/IMSWEB/addProductCategory',data ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product category added successfully...........................");
                                callback("OK");
                            })
                            .error(function(response){
                                console.log("product category added unsuccessfully...........................");
                                callback("FAILED" + response);        
                            });
                };
                service.updateProductCategory=function(data,callback){
                $http.post('/IMSWEB/updateProductCategory',data ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product category update successfully...........................");
                                callback("OK");
                            })
                            .error(function(response){
                                console.log("product category update unsuccessfully...........................");
                                callback("FAILED" +response);        
                            });
                };
                service.getProductCategoryList=function(callback){
                    $http.get('/IMSWEB/getProductCategoryList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.addProduct=function(data,callback){
                $http.post('/IMSWEB/addProduct',data ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product added successfully...........................");
                                callback("OK");
                            })
                            .error(function(response){
                                console.log("product added unsuccessfully...........................");
                                callback("FAILED" + response);        
                            });
                };
                service.updateProduct=function(data,callback){
                $http.post('/IMSWEB/updateProduct',data ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("product category update successfully...........................");
                                callback("OK");
                            })
                            .error(function(response){
                                console.log("product category update unsuccessfully...........................");
                                callback("FAILED" +response);        
                            });
                };
                service.getProductList=function(callback){
                    $http.get('/IMSWEB/getProductList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
              return service;
            }]);
