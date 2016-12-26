/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('ManageOrderService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.takeOrder = function (orderDetails, callback) {
                    $http.post('/IMSWEB/takeOrder', orderDetails, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response,orderno) {
                                console.log("New Order added successfully...........................");
                                callback("OK",response);
                            })
                            .error(function (response) {
                                console.log("New Order  added unsuccessfully...........................");
                                callback("FAILED" + response);
                            });
                };
                service.getOrders=function(callback){
                    $http.get('/IMSWEB/getOrderList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getOrderListRaisedBy=function(data,callback){
                    $http.post('/IMSWEB/getOrderListRaisedBy',data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                return service;

            }]);

