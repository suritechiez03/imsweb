/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
imsappctrl.controller('menuCtrl', function ($scope) {
//  var imagePath = 'img/list/60.jpeg';
    $scope.Menu = [];
//    for (var i = 0; i < 15; i++) {
    $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Dealer",
        Link: "home.adddealer"
    });
    $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Supplier",
        Link: "home.addsupplier"
    });
    $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Authorizer",
        Link: "home.addauthorizer"
    });
    $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Partner",
        Link: "home.adddealer"
    });
    $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Products",
        Link: "home.manageproduct"
    });
     $scope.Menu.push({
//      face: imagePath,
        MenuItem: "Manage Order",
        Link: "home.manageorder"
    });
//    }
});


