const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const color = getRandomHexColor();

    document.body.style.backgroundColor = color;
  }, 1000);

  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);

  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
});