/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

imsappctrl.factory('GeneralDefinitionService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.getGeneraldefintion = function (data, callback) {
                    $http.post('/IMSWEB/getGeneralDefinition', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                service.getTaxSlab = function (callback) {
                    $http.get('/IMSWEB/getTaxSlab', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            })
                            .error(function (response) {
                                callback("FAILED" + response);
                            });
                };
                return service;


            }
        ]);