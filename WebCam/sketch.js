var capture;
var change;
var threshold = 0;
var V = 30;
var targetX;
var targetY;
var vScale = 12;
var Win = 0;
var wave;
var F = 440;

function setup() {
  createCanvas(720, 540);
  pixelDensity(1);
  // frameRate(20);
  capture = createCapture(VIDEO);
  capture.size(width / vScale, height / vScale);
  targetX = floor(random(0, capture.width));
  targetY = floor(random(0, capture.height));
  // capture.hide();

  // Sound setup
  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.amp(0);
  wave.freq(F);
}

function draw() {
  // background(0, 126, 189, 20);
  if (frameCount % 10 == 0) {
    targetX = targetX + floor(random(-1, 2));
    targetY = targetY + floor(random(-1, 2));
    wave.stop();
    wave.amp(0, 1);
  }
  // target edge check
  if (targetX >= capture.width || targetY >= capture.height || targetX <= 0 || targetY <= 0) {
    targetX = floor(random(0, capture.width));
    targetY = floor(random(0, capture.height));

  }

  console.log(Win);
  capture.loadPixels();
  loadPixels();
  // filter(THRESHOLD,0.4);
  for (var y = 0; y < capture.height; y++) {
    for (var x = 0; x < capture.width; x++) {
      var index = (capture.width - x + 1 + (y * capture.width)) * 4;
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];

      var bright = floor((r + g + b) / 3);

      if (bright > threshold + V || bright < threshold - V) {
        fill(255, 77, 0);
        if (y == targetY && x == targetX) {
          targetX = floor(random(0, capture.width));
          targetY = floor(random(0, capture.height));
          Win++;
          wave.amp(0.5, 1);
        } else {
        }
        /*
        pixels[index + 0] = capture.pixels[index + 0];
        pixels[index + 1] = capture.pixels[index + 1];
        pixels[index + 2] = capture.pixels[index + 2];
        pixels[index + 3] = 255;
        */
        threshold = bright;
      } else {
        fill(0, 203, 184, 10);
        /*
        pixels[index + 0] = 0;
        pixels[index + 1] = 25;
        pixels[index + 2] = 150;
        pixels[index + 3] = 0;
        */
      }

      if (Win >= 10) {
        fill(0, 0, 0, 50);
      }
      // fill(bright);

      if (y == targetY && x == targetX) {
        fill(0, 0, 0);
        rect(targetX * vScale, targetY * vScale, vScale, vScale);
      } else {
        rect(x * vScale, y * vScale, vScale, vScale);
      }

    }
  }
  // updatePixels();
}
