// double tap disable -----------------------

let lastTouchEnd = 0;

document.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime();
    const tapDuration = currentTime - lastTouchEnd;

    if (tapDuration < 300) {
        event.preventDefault();
    }

    lastTouchEnd = currentTime;
});

// full screen ----------------------------------------------

const fullscreenButton = document.getElementById('fullscreen-button');
const fullscreenElement = document.getElementById('fullscreen-element');

function enterFullscreen() {
  if (fullscreenElement.requestFullscreen) {
    fullscreenElement.requestFullscreen();
  } else if (fullscreenElement.mozRequestFullScreen) { 
    fullscreenElement.mozRequestFullScreen();
  } else if (fullscreenElement.webkitRequestFullscreen) { 
    fullscreenElement.webkitRequestFullscreen();
  } else if (fullscreenElement.msRequestFullscreen) {
    fullscreenElement.msRequestFullscreen();
  }
}

fullscreenButton.addEventListener('click', enterFullscreen);
