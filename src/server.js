const http = require('http');
var Gpio = require('pigpio').Gpio;

var oikeaMoottori = new Gpio(05, {mode: Gpio.OUTPUT});
var vasenMoottori = new Gpio(03, {mode: Gpio.OUTPUT});
var keski = 1600;
var kerroin = 1;

console.info("Palvelin käynnistetty");
http.createServer(function (request, response) {
	console.info("Saatiin pyyntö");
//	console.info(request.method + " " + request.url);

	var input = request.url.split("/");
//	console.info(input[0] + " " + input[1]);

	if (request.method === 'GET' && request.url === '/echo') {
		console.info("echo");
		var body = [];
		request.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
		});
	}
	else if (request.method === "GET" && input[1] === "vasen" ) {
		console.info("Vasen moottori " + input[2]);
		//vasenMoottori.servoWrite(keski + parseInt(input[2])*kerroin);
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('OK');
		response.end();
	}
	else if (request.method === "GET" && input[1] === "oikea" ) {
		console.info("Oikea moottori " + input[2]);
		vasenMoottori.servoWrite(keski + parseInt(input[2])*kerroin);
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('OK');
		response.end();
	}
	else {
		response.statusCode = 404;
		response.end();
	}
}).listen(8080);


function vasen(nopeus){
	var moottori = new Gpio(05, {mode: Gpio.OUTPUT});

	var pulseWidth = 1600 + parseInt(nopeus);

	console.info(pulseWidth);
	moottori.servoWrite(pulseWidth);
}

function oikea(nopeus){
	var moottori = new Gpio(03, {mode: Gpio.OUTPUT});
	var pulseWidth = 1600 + parseInt(nopeus);

	console.info(pulseWidth);
	motor.servoWrite(pulseWidth);
}