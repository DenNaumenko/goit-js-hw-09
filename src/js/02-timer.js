import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

let timerDate;
let intervalId;
const selector = 'input#datetime-picker';
const startBtn = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
      updateTimer(convertMs(0));
    }

    if (selectedDates[0] > new Date()) {
      timerDate = selectedDates[0];
      startBtn.removeAttribute('disabled');
    }

    clearInterval(intervalId);
  },
};

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(timerData) {
  for (const property in timerData) {
    const timerField = document.querySelector(`[data-${property}]`);

    timerField.innerHTML = addLeadingZero(timerData[property]);
  }
}

function addLeadingZero(value) {
  const strNumber = String(value);

  return strNumber.padStart(2, '0');
}

flatpickr(selector, options);

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    if (!timerDate || timerDate <= new Date().getTime()) {
      clearInterval(intervalId);
    } else {
      const timerMs = timerDate.getTime() - new Date().getTime();
      const obj = convertMs(timerMs);

      updateTimer(obj);
    }
  }, 1000);
});
