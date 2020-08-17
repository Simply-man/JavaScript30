const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => console.log("Well, we have a problem :(", err));
};

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // get the pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess imageData
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlfa = 0.8;
    pixels = greenScreen(pixels);
    // set new image data
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

const takePhoto = () => {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "me");
  link.innerHTML = `<img src=${data} alt="Me" />`;
  strip.insertBefore(link, strip.firstChild);
};

// Add red effect
const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 100;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.2;
  }

  return pixels;
};

// Add rgb effect
const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] + 100;
    pixels.data[i + 500] = pixels.data[i + 1] - 100;
    pixels.data[i - 550] = pixels.data[i + 2] * 0.2;
  }

  return pixels;
};

// Add green Screen effect
const greenScreen = (pixels) => {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

// Run the function
getVideo();

// Listener
video.addEventListener("canplay", paintToCanvas);
