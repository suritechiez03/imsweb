/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('supplierService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.getSupplierNo=function(callback){
                $http.get('/IMSWEB/getSupplierNo', {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function(response){
                                callback("FAILED" +response );        
                            });
                };
                service.addNewSupplier=function(Supplier,callback){
                $http.post('/IMSWEB/addSupplier',Supplier ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                console.log("supplier added successfully...........................");
                                callback("OK");
                            })
                            .error(function(response){
                                console.log("supplier added unsuccessfully...........................");
                                callback("FAILED" + response);        
                            });
                };
                service.updateSupplier=function(Supplier,callback){
                $http.post('/IMSWEB/updateSupplier',Supplier ,{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback("OK");
                            })
                            .error(function(response){
                                callback("FAILED" +response);        
                            });
                };
                service.getSupplierList=function(callback){
                $http.get('/IMSWEB/getSupplierList', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function(response){
                                callback("FAILED" +response );        
                            });
                };
                service.getSupplierbyID=function(supplierID,callback){
                $http.get('/IMSWEB/getSupplierByID',supplierID, {headers: {'Content-Type': 'text/html; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function(response){
                                callback("FAILED" +response );        
                            });
                };
                return service;                  
            }]);
        
