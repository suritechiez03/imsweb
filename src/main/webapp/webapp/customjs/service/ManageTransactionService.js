/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

imsappctrl.factory('ManageTransactionService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.ProcessPayment = function (paymentdetails, callback) {
                    $http.post('/IMSWEB/ProcessPayment', paymentdetails, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("Payment Process SuccessFull...........................");
                                callback(response);
                            })
                            .error(function (response) {
                                console.log("Error while Processing Payment...........................");
                                callback("FAILED");
                            });
                };
                return service;
            }
        ]);

