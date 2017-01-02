/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

imsappctrl.factory('ManageInvoiceService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                
                  service.ProcessInvoice = function (invoiceDetails, callback) {
                    $http.post('/IMSWEB/ProcessInvoice', invoiceDetails, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response,orderno) {
                                console.log("New Invoice added successfully...........................");
                                callback("OK",response);
                            })
                            .error(function (response) {
                                console.log("New Invoice  added unsuccessfully...........................");
                                callback("FAILED" + response);
                            });
                };
                
                return service;
            }
        ]);

