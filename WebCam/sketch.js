var capture;
var change;
var threshold = 0;
var vScale = 4;

function setup() {
  createCanvas(640, 480);
  background(0, 25, 150);
  pixelDensity(1);
  frameRate(20);
  capture = createCapture(VIDEO);
  capture.size(width / vScale, height / vScale);
  // capture.hide();
}

function draw() {
  capture.loadPixels();
  loadPixels();
  for (var y = 0; y < capture.height; y++) {
    for (var x = 0; x < capture.width; x++) {
      var index = (capture.width - x + 1 + y * capture.width) * 4;
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];

      var bright = floor((r + g + b) / 3);


      if (bright > threshold+20 || bright < threshold-20) {
        fill(217, 79, 2);
        threshold = bright;
      } else {
        fill(0,0,255,10);
      }

      // fill(bright);
      rect(x * vScale, y * vScale, vScale, vScale);

    }
  }
  // updatePixels();
}
