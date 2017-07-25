/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
imsappctrl.controller('manageTransactionCtrl',
        ['$scope', '$rootScope', '$timeout', '$mdDialog', '$log', '$mdMedia', '$location', '$filter', '$stateParams','ManageOrderService', 'dealerService', 'supplierService', 'ManageProductService', 'AlertService', 'GeneralDefinitionService','ManageInvoiceService','ManageTransactionService',
            function ($scope, $rootScope, $timeout, $mdDialog, $log, $mdMedia, $location, $filter,$stateParams, ManageOrderService, dealerService, supplierService, ManageProductService, AlertService, GeneralDefinitionService,ManageInvoiceService,ManageTransactionService) {
                $scope.selectedproductlist = [];
                $scope.ManageTransaction={};
                $scope.selected = [];
                $scope.PaymentMethodOptions = ('Cash Cheque Card').split(' ').map(function (state) {
                    return {abbrev: state};
                });
                
                $scope.ValidateInvoice=function(){
                  ManageInvoiceService.getInvoiceDetails($scope.ManageTransaction.InvoiceNo,function(response){
                     if (response != "FAILED"){
                     $scope.ManageTransaction.AmountToBePaid=response.balanceAmount;
                 }else{
                     AlertService.showAlert(this,"Info","Invalid Invoice No","Ok");
                 }
                  });
                };
                $scope.init=function(){
                    AlertService.showAlert(this,"Info","You have selected following Invoice #"+$stateParams.InvoiceNo +" for Payment","Ok");
                    $scope.ManageTransaction.InvoiceNo=$stateParams.InvoiceNo;             //$location.search().InvoiceNo;
                    $scope.ValidateInvoice();
                };
                $scope.process=function(){ 
                	if($scope.ManageTransaction.TransactionAmount > $scope.ManageTransaction.AmountToBePaid){
                		AlertService.showAlert(this,"Info","Transaction amount cannot be greater than "+$scope.ManageTransaction.AmountToBePaid ,"Ok");	
                	}else{
                	ManageTransactionService.ProcessPayment($scope.ManageTransaction,function(response){
                		if(response!="FAILED"){
                			AlertService.showAlert(this,"Info","Payment Successfull" + response.TransactionID,"Ok");		
                		}else{
                			AlertService.showAlert(this,"Error","Failed to Process Payment","Ok");
                		}
                	});
                };
                }
            }
        ]);
        

