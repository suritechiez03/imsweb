/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
imsappctrl.controller('manageInvoicesCtrl',
        ['$scope', '$rootScope', '$timeout', '$mdDialog', '$log', '$mdMedia', '$location', '$filter', 'ManageOrderService', 'dealerService', 'supplierService', 'ManageProductService', 'AlertService', 'GeneralDefinitionService','ManageInvoiceService',
            function ($scope, $rootScope, $timeout, $mdDialog, $log, $mdMedia, $location, $filter, ManageOrderService, dealerService, supplierService, ManageProductService, AlertService, GeneralDefinitionService,ManageInvoiceService) {
                $scope.selectedproductlist = [];

                $scope.ManageInvoice = {products: ''};
                $scope.selected = [];
                $scope.InvoiceForOption = ('Dealer Supplier').split(' ').map(function (state) {
                    return {abbrev: state};
                });

                $scope.InvoiceTypeOption = ('New,From Orders').split(',').map(function (state) {
                    return {abbrev: state};
                });

                $scope.listsupplierordealer = function () {
                    if ($scope.ManageInvoice.InvoiceFor === "Dealer") {
                        console.log("Listing " + $scope.ManageInvoice.InvoiceFor + " info");
                        dealerService.getDealerList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"dealerNumber":').join('"supplierdealerno":'));
                        });
                    }
                    if ($scope.ManageInvoice.InvoiceFor === "Supplier") {
                        console.log("Listing " + $scope.ManageInvoice.InvoiceFor + " info");
                        supplierService.getSupplierList(function (response) {
                            $scope.DealerSupplierlist = JSON.parse(JSON.stringify(response).split('"supplierNumber":').join('"supplierdealerno":'));
                        });
                    }
                };
                $scope.loadOrders = function () {
                    $scope.orderlist = [];
                    $scope.ManageInvoice.selectedproductlist = [];
                    console.log($scope.ManageInvoice.DealerOrSupplier.supplierdealerno);
                    if ($scope.ManageInvoice.InvoiceType === "From Orders") {
                        $scope.ManageInvoice.InvoiceTypeFlag = true;
                        $scope.ManageInvoice.ShowAddProduct = false;
                        ManageOrderService.getOrderListRaisedBy($scope.ManageInvoice.DealerOrSupplier.supplierdealerno, function (response) {
                            console.log(JSON.stringify(response));
                            $scope.orderlist = response;
                        });
                    } else if ($scope.ManageInvoice.InvoiceType === "New") {
                        $scope.ManageInvoice.InvoiceTypeFlag = false;
                        $scope.ManageInvoice.ShowAddProduct = true;
                        $scope.ManageInvoice.selectedproductlist = [];
                    }
                };
                var loadFrieghtTerms = function () {
                    var data = '{"gdAbb":"FRT"}';
                    GeneralDefinitionService.getGeneraldefintion(data, function (response) {
                        console.log(JSON.stringify(response));
                        $scope.FrieghtTerms = response;
                    });

                };
                var loadTaxSlab = function () {

                    GeneralDefinitionService.getTaxSlab(function (response) {
                        console.log(JSON.stringify(response));
                        if (response !== "FAILED")
                        {
                            $scope.TaxSlab = response;
                            $scope.ManageInvoice.CSTPercentage = $scope.TaxSlab[0].cstpercentage;
                            $scope.ManageInvoice.excessPercentage = $scope.TaxSlab[0].excessPercentage;
                            $scope.ManageInvoice.educationCessPercentage = $scope.TaxSlab[0].educationCessPercentage;
                            $scope.ManageInvoice.secondaryEducationCessPercentage = $scope.TaxSlab[0].secondaryEducationCessPercentage;
                            $scope.ManageInvoice.VAT1 = $scope.TaxSlab[0].vat1;
                            $scope.ManageInvoice.VAT2 = $scope.TaxSlab[0].vat2;
                            $scope.VATList=[$scope.TaxSlab[0].vat1,$scope.TaxSlab[0].vat2];
                            

                        } else {
                            AlertService.showAlert(this, "", "Tax Values not Loaded ", "OK");
                        }

                    });

                };
                var initialzezero = function () {
                    $scope.ManageInvoice.GrossAmount = 0;
                    $scope.ManageInvoice.RoundOff = 0;
                    $scope.ManageInvoice.FinalAmount = 0;
                    $scope.ManageInvoice.FAFcharges = 0;
                }
                $scope.initInvoiceFrm = function () {
                    initialzezero();
                    loadFrieghtTerms();
                    loadTaxSlab();
                    loadProducts();
                    initialzezero();
                };
                $scope.AddtoCart = function (product, qty) {
                    product.orderQuantity = qty;
                    product.UnitPrice = 0;
                    product.Discount = 0;
                    product.VAT = 0.0;
                    product.TotalPrice = 0.0;
                    product.MarginPrecnt = 0.0;
                    product.MarginAmt = 0.0;
                    product.DealerPrice = 0.0;

                    if ($scope.selectedproductlist.indexOf(product) === -1) {
                        $scope.selectedproductlist.push(product);
                        $scope.orderQuantity = 0;

                    } else {
                        AlertService.showAlert(this, "", "Item Already Exists", "OK");
                    }

                    console.log($scope.selectedproductlist);
                };
                $scope.updateTotal = function (item) {

                    item.TotalPrice = (item.orderQuantity * item.UnitPrice);
                    item.TotalPrice = item.TotalPrice - ((item.TotalPrice * item.Discount) / 100);
                    item.TotalPrice = $scope.fixedto4digit(item.TotalPrice + ((item.TotalPrice * item.VAT) / 100));
                    item.MarginAmt = $scope.fixedto4digit(((item.TotalPrice * item.MarginPrecnt) / 100));
                    item.DealerPrice = $scope.fixedto4digit(item.TotalPrice + item.MarginAmt);
                    $scope.CalcuateCharges();



                };
                $scope.CalcuateCharges = function () {
                    var grossamt = 0
                    var totalPrice = 0;
                    var totalTax = 0;
                    var roundoff = 0;
                    for (i = 0; i < $scope.selectedproductlist.length; i++) {

                        grossamt = grossamt + $scope.selectedproductlist[i].TotalPrice;
                        totalPrice = ($scope.selectedproductlist[i].orderQuantity * $scope.selectedproductlist[i].UnitPrice);
                        totalPrice = totalPrice - (totalPrice * $scope.selectedproductlist[i].Discount) / 100;
                        totalTax = (totalTax + ((totalPrice * $scope.selectedproductlist[i].VAT) / 100));

                    }
                    grossamt = $scope.fixedto4digit((grossamt + $scope.ManageInvoice.FAFcharges));
                    $scope.ManageInvoice.GrossAmount = $scope.fixedto4digit(grossamt);
                    $scope.ManageInvoice.excessRate = $scope.fixedto4digit((grossamt * $scope.ManageInvoice.excessPercentage) / 100);
                    $scope.ManageInvoice.CSTRate = $scope.fixedto4digit((grossamt * $scope.ManageInvoice.CSTPercentage) / 100);
                    $scope.ManageInvoice.educationCessRate = $scope.fixedto4digit((grossamt * $scope.ManageInvoice.educationCessPercentage) / 100);
                    $scope.ManageInvoice.secondaryEducationCessRate = $scope.fixedto4digit((grossamt * $scope.ManageInvoice.secondaryEducationCessPercentage) / 100);
                    $scope.ManageInvoice.Vat1Rate = $scope.fixedto4digit(totalTax);
                    roundoff = parseFloat(grossamt) + parseFloat($scope.ManageInvoice.excessRate) + parseFloat($scope.ManageInvoice.CSTRate) + parseFloat($scope.ManageInvoice.educationCessRate) + parseFloat($scope.ManageInvoice.secondaryEducationCessRate) + parseFloat($scope.ManageInvoice.Vat1Rate);

                    $scope.ManageInvoice.RoundOff = $scope.fixedto4digit($scope.fixedto4digit(roundoff) - $scope.fixedto4digit(Math.floor($scope.fixedto4digit(roundoff)))); //(Math.floor(parseFloat(roundoff).toFixed(4)) - parseFloat(roundoff).toFixed(4)).toFixed(4).toString();
                    $scope.ManageInvoice.FinalAmount = $scope.fixedto2digit(Math.floor(parseFloat(roundoff)));


                }
                $scope.Remove = function (productIndex) {
                    $scope.selectedproductlist.splice(productIndex, 1);
                    $scope.CalcuateCharges();
                };
                $scope.NextTab = function () {
                    // $scope.ManageInvoice.selectedproductlist=[];
                    if ($scope.ManageInvoice.InvoiceType === "From Orders") {
                        for (i = 0; i < $scope.selectedproductlist.length; i++) {
                            $scope.Remove(i);
                        }
                        $scope.ManageInvoice.ShowInvoice = true;
                        
                        for (i = 0; i < $scope.ManageInvoice.SelectedOrder.products.length; i++) {
                            $scope.AddtoCart($scope.ManageInvoice.SelectedOrder.products[i], $scope.ManageInvoice.SelectedOrder.products[i].orderQuantity);
                        }
                        
                    }
                    if ($scope.ManageInvoice.InvoiceType==="New"){
                        for (i = 0; i < $scope.selectedproductlist.length; i++) {
                            $scope.Remove(i);
                        }
                    }
                    $scope.selectedIndex = 1;
                };

                $scope.fixedto4digit = function (i) {

                    console.log((+(Math.round(i + "e+4") + "e-4")));
                    return (+(Math.round(i + "e+4") + "e-4"));
                };
                $scope.fixedto2digit = function (i) {

                    console.log((+(Math.round(i + "e+2") + "e-2")));
                    return (+(Math.round(i + "e+2") + "e-2"));
                }
                var loadProducts = function () {
                    ManageProductService.getProductList(function (response) {
                        console.log(JSON.stringify(response));
                        $scope.productlist = response;
                    });
                };
                 $scope.SubmitInvoice = function () {
//                    console.log($scope.selectedproductlist);
                    $scope.ManageInvoice.products = $scope.selectedproductlist;
                    $scope.ManageInvoice.OrderFor=$scope.ManageInvoice.InvoiceFor; // to map with order mgmt model
                    $scope.ManageInvoice.dealerorsupplierno=$scope.ManageInvoice.DealerOrSupplier.supplierdealerno; // to map with order mgmt model
                    console.log(JSON.stringify($scope.ManageInvoice));
                    ManageInvoiceService.ProcessInvoice($scope.ManageInvoice, function (response, orderno) {
//                        console.log(order     no);
                        if (response == "OK") {
                            AlertService.showAlert(this, "New Invoice", "Invoice# " + orderno.GeneratedOrderNo + " has been recived Successfully for " + $scope.ManageOrder.dealerorsupplierno, "ok");
                            $scope.selectedproductlist = [];
                            $scope.ManageInvoice.products = [];
                        } else {
                            AlertService.showAlert(this, "New Order", "Unable to Recive order for " + $scope.ManageInvoice.dealerorsupplierno, "ok");
                        }

                    });
                };
                $scope.getQuotation=function(){
                  $scope.selectedIndex=2;
                  $scope.hideManageInvoice=true;
               
                };

            }
        ]);


