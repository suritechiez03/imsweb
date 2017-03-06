/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

imsappctrl.factory('initService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                service.callme=function(){
                  console.log("you called me")  ;
                };
                service.getAppsettings = function (param1,callback) {
                    $http.get('/IMSWEB/initialize', {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function (response) {
                                callback(response);
                            });
                };
                return service;
            }]);
