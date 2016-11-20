/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

imsappctrl.factory('AlertService',
        ['$http', '$cookieStore', '$rootScope', '$timeout', '$mdDialog',
            function ($http, $cookieStore, $rootScope, $timeout, $mdDialog) {
                var service = {};
                service.confirmAlert = function (title, content, okButtontext, cancelButtonText, callback) {
                    var confirm = $mdDialog.confirm()
                            .title(title)
                            .textContent(content)
                            .ariaLabel('Lucky day')
                            .targetEvent(ev)
                            .ok(okButtontext)
                            .cancel(cancelButtonText);

                    $mdDialog.show(confirm).then(function () {
                        //$scope.status = 'You decided to get rid of your debt.';
                        callback("OK");

                    }, function () {
                        //$scope.status = 'You decided to keep your debt.';
                        callback("Cancel");
                    });
                };
                service.showAlert = function (ev,title, content, okButtontext ) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                    // to prevent interaction outside of dialog
                    $mdDialog.show(
                            $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title(title)
                            .textContent(content)
                            .ariaLabel('Alert Dialog Demo')
                            .ok(okButtontext)
                            .targetEvent(ev)
                            );
                };

                return service;
            }
        ]
        );

