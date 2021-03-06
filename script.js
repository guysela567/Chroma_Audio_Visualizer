let song, buttton, fft;

function toggleSong() {
  if (song.isPlaying()) song.pause();
  else song.play();
}

function preload() {
  song = loadSound('audio.mp3'); 
}

function setup() {
  chromaInit(60);
  colorMode(HSB)
  angleMode(DEGREES);
  buttton = createButton('Toggle Play');
  buttton.mousePressed(toggleSong);
  song.play();  
  fft = new p5.FFT(0.9, 128);
}

function draw() {
  background(0);
  
  let spectrum = fft.analyze();
  const startingPoint = 5;
  for (let i = startingPoint; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0) * 2;
    fill((i - startingPoint) * 5, 255, 255);
    rect(i - startingPoint, y, 1, height - y);
  }

  updatePreviewGrid();
}


function touchStarted() {
  getAudioContext().resume();
}