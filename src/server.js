const http = require('http');
var Gpio = require('pigpio').Gpio;

var oikeaMoottori = new Gpio(03, {mode: Gpio.OUTPUT});
var vasenMoottori = new Gpio(02, {mode: Gpio.OUTPUT});
var vasenkeski = 1585;
var oikeakeski = 1565;
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
		var nopeus = vasenkeski + parseInt(input[2])*kerroin;
		console.info("Vasen moottori " + nopeus);
		vasenMoottori.servoWrite(nopeus);
		// vasen(input[2]);
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('OK');
		response.end();
	}
	else if (request.method === "GET" && input[1] === "oikea" ) {
		var nopeus = oikeakeski + parseInt(input[2])*kerroin;
		console.info("Oikea moottori " + nopeus);
		oikeaMoottori.servoWrite(nopeus);
		// oikea(input[2]);
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('OK');
		response.end();
	}
	else {
		response.statusCode = 404;
		response.end();
	}
}).listen(8080);