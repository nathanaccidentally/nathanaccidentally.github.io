			var usernames = ["nathang"];
			var passwords = ["password"];

			function login() {
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;

				var usernameARRAY = usernames.indexOf(username);
				var passworARRAY = passwords.indexOf(password);
				console.log("User " + usernameARRAY);

				if (usernameARRAY || passworARRAY == -1) {
					console.log("login failed");
					return;
				}

				if (usernameARRAY != passworARRAY) {
					alert("Login Failed");
				} else {
					console.log("login success");
					document.cookie = "username=" + username;
					document.getElementById("subtext").innerHTML = "login success!";

					// window.location.href = "http://google.com";
				}
			}

			function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function checkLoggedIn() {
	var name = readCookie('username');

	if (usarnames.indexOf(name) !== -1) {
		console.log("output");
	} else {
		console.log("no output");
	}
}