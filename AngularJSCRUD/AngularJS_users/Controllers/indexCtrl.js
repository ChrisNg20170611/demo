/*
appIndex.controller('indexController', ['$scope', 'DataService', function ($scope, DataService) {

}]);
*/

//controllers for other routed pages
appIndex.controller('ListUsersController', function($scope, DataService) {
    //$scope.message = "ListUsersController";
    $scope.listPerson = "";
    loadPersons();
    function loadPersons()
    {
        DataService.getPersons().then(function successCallback(response) {
            console.log('[## IndexCtrl ##] response.data: '+response.data.length);
            if (response.data.length > 0) {
                $scope.listPerson = response.data;
            } 
        }, function errorCallback(response) {
			alert('Number of returned record: '+response.data.length);
            alert(response.status);
        });
    }
  
    $scope.Remove = function(id) {
        DataService.deletePerson(id).then(function successCallback(response) {
            if (response.data == "OK") {
                loadPersons();
                console.log("Remove user with user_id "+id+" successfully done !");
            }
        
        }, function errorCallback(response) {
            alert(response.status);
        });  
    }

    $scope.selectUser = function(user) {
        $scope.user = user;
    }
});

appIndex.controller('EditUserController', function($scope, $routeParams, DataService, $location) {
    //$scope.message = "EditUserController";
    user_id = $routeParams.user_id;
    //alert('EditUserController user: '+user_id);
    loadOnePerson(user_id);
    function loadOnePerson(user_id)
    {
        DataService.getOnePerson(user_id).then(function successCallback(response) {
            $scope.user = response.data;
        }, function errorCallback(response) {
            alert(response.status);
        });
    }

    $scope.SaveEditUser = function(user)
    {
        DataService.editPerson(user).then(function successCallback(response) {
            //alert('location: '+$location.path());
            if(response.data == "OK"){
                console.log("Save "+user.user_id+" successfully done !");
                $location.path('/listUser');
            }
       }, function errorCallback(response) {
           alert(response.status);
       });
    }
});
 
appIndex.controller('AddUserController', function($scope, $routeParams, DataService, $location) {
    //$scope.message = "AddUserController";
    user = $routeParams.user;
    $scope.AddUser = function(user)
    {
        //alert('in add function: '+JSON.stringify(user));
        DataService.addPerson(user).then(function successCallback(response) {
            //alert('location: '+$location.path());
            if(response.data == "OK"){
                console.log("Add new user "+user.user_id+" successfully done !");
                $location.path('/listUser');
            }
       }, function errorCallback(response) {
           alert(response.status);
       });
    }
});

 