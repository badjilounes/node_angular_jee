angular. module ('authService', []).service('auth',authFnc);
authFnc.$inject=['$http','$q'];
function authFnc($http,$q) {
	var timeout = 3000;
	var userMap={};
	userMap['jdoe'] = {pwd: 'jd', role: "watcher"};
	userMap['psmith'] = {pwd: 'psmithpwd', role: "admin"};
	userMap['tp'] =  {pwd: 'tp', role: "admin"};
	var fncContainer={
		localAuthAsk:localAuthAsk,
        authAsk: authAsk,
		userList: userList,
        User: User
	};
	function localAuthAsk(login,pwd){
		var deferred = $q.defer();
		setInterval(function(login,pwd){
			if( typeof userMap[login] !== "undefined" && userMap[login].pwd == pwd){
				deferred.resolve({"user":User(login, pwd, userMap[login].role),"ValidAuth": true});
			}else{
				deferred.reject({"user":{},"ValidAuth": false});
			}
			clearInterval(this);
		}, timeout, login, pwd);
	return deferred.promise;
	}

    function authAsk(login, pwd){
        var deferred = $q.defer();
        $http.post('http://localhost:1337/fakeauth', {login:login, pwd:pwd}).
            success(function(data, status, headers, config) {
                var surname;
                if(data)
                    surname = data.surname;
                deferred.resolve({"user":User(login, pwd, userMap[login].role, surname),"ValidAuth": true, msg: data.msg});
            }).
            error(function(data, status, headers, config) {
                var msg;
                if(data)
                    msg = data.msg;
                if(status == 401)
                    msg = "Login failed";
                deferred.reject({"user":{},"ValidAuth": false, msg: msg});
                // or server returns response with an error status.
            });
        return  deferred.promise;
    }

	function userList(){
		return userMap;
	}

    function User(login, pwd, role, surname){
        if(typeof login === "undefined" || login === "")
            login = "guest";
        if(typeof surname === "undefined")
            surname = "";
        if(typeof pwd === "undefined"  || pwd === "")
            pwd = "guest";
        if(typeof role === "undefined"  || ["watcher", "admin"].indexOf(role.toLowerCase()) == -1)
            role = "watcher";
        return {login: login, pwd: pwd, role: role, surname: surname};
    }

	return fncContainer;
}