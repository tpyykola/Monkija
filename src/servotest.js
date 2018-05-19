var Gpio = require('pigpio').Gpio,
  motor = new Gpio(03, {mode: Gpio.OUTPUT}),
  pulseWidth = 1600,
  increment = 100;

setInterval(function () {
  motor.servoWrite(pulseWidth);
// sleep(1000);
}, 1000);
