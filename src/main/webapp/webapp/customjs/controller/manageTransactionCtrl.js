/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
imsappctrl.controller('manageTransactionCtrl',
        ['$scope', '$rootScope', '$timeout', '$mdDialog', '$log', '$mdMedia', '$location', '$filter', 'ManageOrderService', 'dealerService', 'supplierService', 'ManageProductService', 'AlertService', 'GeneralDefinitionService','ManageInvoiceService',
            function ($scope, $rootScope, $timeout, $mdDialog, $log, $mdMedia, $location, $filter, ManageOrderService, dealerService, supplierService, ManageProductService, AlertService, GeneralDefinitionService,ManageInvoiceService) {
                $scope.selectedproductlist = [];
                $scope.selected = [];
                $scope.PaymentMethodOptions = ('Cash Cheque Card').split(' ').map(function (state) {
                    return {abbrev: state};
                });
                $scope.init=function(){
//                    alert('hi' + $location.search().InvoiceNo);
                    $scope.ManageTransaction.InvoiceNo=$location.search().InvoiceNo;
                };
            }
        ]);
        

