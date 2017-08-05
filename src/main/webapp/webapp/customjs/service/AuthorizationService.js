/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

imsappctrl.factory('AuthorizationService', function ($resource, $q, $rootScope, $location) {
    return {
        // We would cache the permission for the session,
        //to avoid roundtrip to server
        //for subsequent requests

        permissionModel: {
            permission: {},
            isPermissionLoaded: false
        },

        permissionCheck: function (roleCollection) {

            // we will return a promise .
            var deferred = $q.defer();

            //this is just to keep a pointer to parent scope from within promise scope.
            var parentPointer = this;

            //Checking if permission object(list of roles for logged in user) 
            //is already filled from service
            if (this.permissionModel.isPermissionLoaded) {
                //Check if the current user has required role to access the route
                this.getPermission(this.permissionModel, roleCollection, deferred);
            } else {
                //if permission is not obtained yet, we will get it from  server.
                // 'api/permissionService' is the path of server web service , used for this example.

                if($rootScope.globals.roles !== null ) {
                    //when server service responds then we will fill the permission object
                    parentPointer.permissionModel.permission = $rootScope.globals.roles;

                    //Indicator is set to true that permission object is filled and 
                    //can be re-used for subsequent route request for the session of the user
                    parentPointer.permissionModel.isPermissionLoaded = true;

                    //Check if the current user has required role to access the route
                    parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
                }
            }
            return deferred.promise;
        },

        //Method to check if the current user has required role to access the route
        //'permissionModel' has permission information obtained from server for current user
        //'roleCollection' is the list of roles which are authorized to access route
        //'deferred' is the object through which we shall resolve promise
        getPermission: function (permissionModel, roleCollection, deferred) {
            var ifPermissionPassed = false;
            alert("inside auth");
            angular.forEach(roleCollection, function (role) {
                switch (role) {
                    case roles.admin:
                        if (permissionModel.permission.isAdmin) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case roles.user:
                        if (permissionModel.permission.isUser) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case roles.cashier:
                        if (permissionModel.permission.isCashier) {
                            ifPermissionPassed = true;
                        }
                        break;
                    default:
                        ifPermissionPassed = false;
                }
            });
            if (!ifPermissionPassed) {
                //If user does not have required access, 
                //we will route the user to unauthorized access page
                $location.path(routeForUnauthorizedAccess);
                //As there could be some delay when location change event happens, 
                //we will keep a watch on $locationChangeSuccess event
                // and would resolve promise when this event occurs.
                $rootScope.$on('$locationChangeSuccess', function (next, current) {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }
    };
});