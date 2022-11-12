// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

function getElement(selector) {
    return document.querySelector(selector);
}

function startTimer() {
    startButtonRef.disabled = true;

    setInterval(updateTimer, 1000);
}

function updateTimer() {
    let { days, hours, minutes, seconds } = convertMs(selectedDate - Date.now());

    getElement('[data-days]').textContent = addLeadingZero(days);
    getElement('[data-hours]').textContent = addLeadingZero(hours);
    getElement('[data-minutes]').textContent = addLeadingZero(minutes);
    getElement('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

let startButtonRef = getElement("[data-start]");
startButtonRef.disabled = true;

let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (Date.now() - selectedDates[0] > 0) {
            Notify.failure("Please choose a date in the future");

            startButtonRef.disabled = true;

            return;
        };

        selectedDate = selectedDates[0];
        startButtonRef.disabled = false;
    },
};

const fp = flatpickr("#datetime-picker", options);

startButtonRef.addEventListener('click', startTimer);