import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector(".form").addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let {delay: {value: delay}, step: {value: step}, amount: {value: amount}} = event.currentTarget;

  delay = Number.parseInt(delay);

  for (let i = 1; i <= amount; i += 1, delay += Number.parseInt(step)) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
    }, delay);
  });
}