import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function handler(e) {
  e.preventDefault();
  const target = e.target;

  const firstDelay = Number(target.elements.delay.value);
  const step = Number(form.querySelector('[name="step"]').value);
  const amount = Number(form.querySelector('[name="amount"]').value);
  let delayAmount = 0;

  for (let i = 1; i <= amount; i++) {
    const delay = i === 1 ? firstDelay : step;
    delayAmount += delay;

    createPromise(i, delayAmount)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', handler);
