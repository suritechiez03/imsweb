/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

imsappctrl.factory('ManageInvoiceService',
        ['$http', '$cookieStore', '$rootScope', '$timeout', '$window',
            function ($http, $cookieStore, $rootScope, $timeout, $window) {
                var service = {};

                service.ProcessInvoice = function (invoiceDetails, callback) {
                    $http.post('/IMSWEB/ProcessInvoice', invoiceDetails, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("New Invoice added successfully...........................");
                                callback(response);
                            })
                            .error(function (response) {
                                console.log("New Invoice  added unsuccessfully...........................");
                                callback("FAILED");
                            });
                };
                service.getInvoiceNo = function (callback) {
                    $http.get('/IMSWEB/getSalesInvoiceNo', {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("Getting Invoice No...........................");
                                callback(response);
                            })
                            .error(function (response) {
                                console.log("Failed to recive Invoice NO...........................");
                                callback("FAILED");
                            });
                };
                service.getSalesPDF = function (invoice) {

                    $http.get('/IMSWEB/IMS_ReportService?OPETYPE=5&InvoiceNo=' + invoice.InvoiceNo + '&filename=RptSalesInvoice', {responseType: 'arraybuffer'})
                            .success(function (data) {
                                var file = new Blob([data], {type: 'application/pdf'});
                                var fileURL = URL.createObjectURL(file);
                                $window.open(fileURL);
                            });
                }
                service.getPurchasePDF = function (invoice) {

                    $http.get('/IMSWEB/IMS_ReportService?OPETYPE=5&InvoiceNo=' + invoice.InvoiceNo + '&filename=RptTaxInvoice', {responseType: 'arraybuffer'})
                            .success(function (data) {
                                var file = new Blob([data], {type: 'application/pdf'});
                                var fileURL = URL.createObjectURL(file);
                                $window.open(fileURL);
                            });
                }
                service.getInvoiceDetails = function (invoiceno, callback) {
                    $http.post('/IMSWEB/getInvoicebyNo', invoiceno, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("Getting Invoice Info...........................");
                                callback(response);
                            })
                            .error(function (response) {
                                console.log("Failed to recive Invoice Info...........................");
                                callback("FAILED");
                            });
                };
                service.getInvoiceList = function (invoiceno, callback) {
                    $http.post('/IMSWEB/getInvoiceList', invoiceno, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("Getting Invoice Info...........................");
                                callback(response);
                            })
                            .error(function (response) {
                                console.log("Failed to recive Invoice Info...........................");
                                callback("FAILED");
                            });
                };
                return service;
            }
        ]);

