// for windows
// var SERVER_URL = "http://localhost:8080/"
// for ZYBO
var SERVER_URL = "http://192.168.1.87:8080/"

// setInterval(getStatus, 200)
getStatus();
sendStatus();

// {"LED0":"ON", "LED1":"ON", "LED2":"ON", "LED3":"ON", "LED4":"ON", "COLOR0_r":100, "COLOR0_g":100, "COLOR0_b":100, "COLOR1_r":100, "COLOR1_g":100, "COLOR1_b":100}'
function pressButton(id) {
	if (document.getElementById(id).classList.contains('btn-primary')) {
		document.getElementById(id).classList.remove('btn-primary');
		document.getElementById(id).classList.add('btn-success');
	} else {
		document.getElementById(id).classList.remove('btn-success');
		document.getElementById(id).classList.add('btn-primary');
	}
	sendStatus();
}

// {"btn0": "ON", "btn1": "OFF", "btn2": "ON", "btn3": "OFF", "btn4": "ON", "btn5": "OFF", "sw0": "OFF", "sw1": "ON", "sw2": "OFF", "sw3": "ON"}
function sendStatus() {
	callApi(
		SERVER_URL + "setStatus",
		{
			"LED0": document.getElementById("button-led0").classList.contains('btn-primary') ? "OFF" : "ON",
			"LED1": document.getElementById("button-led1").classList.contains('btn-primary') ? "OFF" : "ON",
			"LED2": document.getElementById("button-led2").classList.contains('btn-primary') ? "OFF" : "ON",
			"LED3": document.getElementById("button-led3").classList.contains('btn-primary') ? "OFF" : "ON",
			"LED4": document.getElementById("button-led4").classList.contains('btn-primary') ? "OFF" : "ON",
			"COLOR0_r": document.getElementById("range-led5-r").value,
			"COLOR0_g": document.getElementById("range-led5-g").value,
			"COLOR0_b": document.getElementById("range-led5-b").value,
			"COLOR1_r": document.getElementById("range-led6-r").value,
			"COLOR1_g": document.getElementById("range-led6-g").value,
			"COLOR1_b": document.getElementById("range-led6-b").value,
		},
		function (o) {
		});
}

function getStatus() {
	callApi(
		SERVER_URL + "getStatus",
		{"dummy":"dummy"},
		function (o) {
			console.log(o.responseText);
			var retJson = eval('new Object(' + o.responseText + ')');
			if (retJson.btn0 == "ON") {
				document.getElementById("button-btn0").classList.remove('btn-primary');
				document.getElementById("button-btn0").classList.add('btn-success');
			} else {
				document.getElementById("button-btn0").classList.remove('btn-success');
				document.getElementById("button-btn0").classList.add('btn-primary');
			}
			if (retJson.btn1 == "ON") {
				document.getElementById("button-btn1").classList.remove('btn-primary');
				document.getElementById("button-btn1").classList.add('btn-success');
			} else {
				document.getElementById("button-btn1").classList.remove('btn-success');
				document.getElementById("button-btn1").classList.add('btn-primary');
			}
			if (retJson.btn2 == "ON") {
				document.getElementById("button-btn2").classList.remove('btn-primary');
				document.getElementById("button-btn2").classList.add('btn-success');
			} else {
				document.getElementById("button-btn2").classList.remove('btn-success');
				document.getElementById("button-btn2").classList.add('btn-primary');
			}
			if (retJson.btn3 == "ON") {
				document.getElementById("button-btn3").classList.remove('btn-primary');
				document.getElementById("button-btn3").classList.add('btn-success');
			} else {
				document.getElementById("button-btn3").classList.remove('btn-success');
				document.getElementById("button-btn3").classList.add('btn-primary');
			}

			if (retJson.sw0 == "ON") {
				document.getElementById("button-sw0").classList.remove('btn-primary');
				document.getElementById("button-sw0").classList.add('btn-success');
			} else {
				document.getElementById("button-sw0").classList.remove('btn-success');
				document.getElementById("button-sw0").classList.add('btn-primary');
			}
			if (retJson.sw1 == "ON") {
				document.getElementById("button-sw1").classList.remove('btn-primary');
				document.getElementById("button-sw1").classList.add('btn-success');
			} else {
				document.getElementById("button-sw1").classList.remove('btn-success');
				document.getElementById("button-sw1").classList.add('btn-primary');
			}
			if (retJson.sw2 == "ON") {
				document.getElementById("button-sw2").classList.remove('btn-primary');
				document.getElementById("button-sw2").classList.add('btn-success');
			} else {
				document.getElementById("button-sw2").classList.remove('btn-success');
				document.getElementById("button-sw2").classList.add('btn-primary');
			}
			if (retJson.sw3 == "ON") {
				document.getElementById("button-sw3").classList.remove('btn-primary');
				document.getElementById("button-sw3").classList.add('btn-success');
			} else {
				document.getElementById("button-sw3").classList.remove('btn-success');
				document.getElementById("button-sw3").classList.add('btn-primary');
			}

			setTimeout(getStatus, 200)
		});
}

function callApi(url, jsonObj, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Accept', 'application/json');

	xhr.onreadystatechange = (function(myxhr) {
		return function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback(myxhr);
			}
		}
	})(xhr);

	xhr.send(JSON.stringify(jsonObj));
}
