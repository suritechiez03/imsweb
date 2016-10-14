/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('dealerService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.getDealerNo = function (callback) {
                    $http.get('/IMSWEB/getDealerNo', {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.addNewDealer = function (Dealer, callback) {
                    $http.post('/IMSWEB/addDealer', Dealer, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("dealer added successfully...........................");
                                callback("OK");
                            })
                            .error(function (response) {
                                console.log("dealer added unsuccessfully...........................");
                                callback("FAILED" + response);
                            });
                };
                service.updateDealer = function (Dealer, callback) {
                    $http.post('/IMSWEB/updateDealer', Dealer, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback("OK");
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getDealerList = function (callback) {
                    $http.get('/IMSWEB/getDealerList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getDealerbyID = function (dealerID, callback) {
                    $http.post('/IMSWEB/getDealerByID', dealerID, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                return service;
            }]);

