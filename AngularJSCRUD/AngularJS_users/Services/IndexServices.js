appIndex.factory('DataService', ['$http', function ($http) {

    var getPersons = function () {
        //return $http.get("http://127.0.0.1:8081/getPersons");
        return $http.get("https://quiet-brushlands-18479.herokuapp.com/api/user");
        //var url = "data.txt";   
        //return $http.get(url).success( function(response) {
           //$scope.listPerson = response; 
        //});
    }

    var getOnePerson = function (user_id) {
        var parameters = {
            user_id: user_id,
        };
        return $http.get("https://quiet-brushlands-18479.herokuapp.com/api/user/"+user_id);
    }

    var addPerson = function (obj) {
        var data = angular.copy(obj);
        
        var parameters = {
            obj: JSON.stringify(data),
        };
        var config = {
            params: parameters
        };
        //return $http.get("http://127.0.0.1:8081/addPerson", config);
        console.log('Data send from AngularJS addPerson: '+JSON.stringify(obj));
        return $http.post("https://quiet-brushlands-18479.herokuapp.com/api/user", obj);
    }    
    var editPerson = function (obj) {
        //removed the $$hashKey properties
        var data = angular.copy(obj);
        var parameters = {
            obj: JSON.stringify(data),
        };
        var config = {
            params: parameters
        };
        //return $http.get("http://127.0.0.1:8081/updatePerson", config);
        console.log('Data send from AngularJS editPerson: '+JSON.stringify(obj));
        return $http.put("https://quiet-brushlands-18479.herokuapp.com/api/user/"+obj.user_id, obj);
    }
    var deletePerson = function (id) {
        var parameters = {
            id: id,
        };
        var config = {
            params: parameters
        };
        //return $http.get("http://127.0.0.1:8081/removePerson", config);
        return $http.delete("https://quiet-brushlands-18479.herokuapp.com/api/user/"+id, config);
    }
    
    return {
        getPersons: getPersons,
        getOnePerson: getOnePerson,
        addPerson: addPerson,
        editPerson: editPerson,
        deletePerson: deletePerson,
    }
}]);