/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('authorizerService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.getAuthorizerNo = function ( type,callback) {
                    if (type === "Dealer") {
                        $http.get('/IMSWEB/getDealerAuthorizerNo', {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                                .success(function (response) {
                                    callback(response);
                                })
                                .error(function (response) {
                                    callback("FAILED" + response);
                                });
                    }
                    if (type === "Supplier") {
                        $http.get('/IMSWEB/getSupplierAuthorizerNo', {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                                .success(function (response) {
                                    callback(response);
                                })
                                .error(function (response) {
                                    callback("FAILED" + response);
                                });
                    }
                };
                service.addNewDealerAuthorizer = function (Authorizer, callback) {
                    $http.post('/IMSWEB/addDealerAuthorizer', Authorizer, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("dealerauthorizer added successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("dealerauthorizer added unsuccessfully...........................");
                                callback("FAILED" + response);
                            });
                };
                service.updateDealerAuthorizer = function (Authorizer, callback) {
                $http.post('/IMSWEB/updateDealerAuthorizer',Authorizer ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback("OK");
                            })
                            .error(function(response){
                                callback("FAILED" +response);        
                            });
                };
                 service.addNewSupplierAuthorizer = function (Authorizer, callback) {
                    $http.post('/IMSWEB/addSupplierAuthorizer', Authorizer, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("supplierauthorizer added successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("supplierauthorizer added unsuccessfully...........................");
                                callback("FAILED" + response);
                            });
                };
                service.updateSupplierAuthorizer = function (Authorizer, callback) {
                $http.post('/IMSWEB/updateSupplierAuthorizer',Authorizer ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback("OK");
                            })
                            .error(function(response){
                                callback("FAILED" +response);        
                            });
                };
                service.getDealerAuthorizerList = function (callback) {
                    $http.get('/IMSWEB/getDealerAuthorizerList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getSupplierAuthorizerList = function (callback) {
                    $http.get('/IMSWEB/getSupplierAuthorizerList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getAuthorizerbyID = function (dealerID, callback) {
//                $http.get('/IMSWEB/getAuthorizerByID',dealerID, {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
//                            .success(function (response) {
//                                callback(response);
//                            })
//                            .error(function(response){
//                                callback("FAILED" +response );        
//                            });
                };
                return service;
            }]);

