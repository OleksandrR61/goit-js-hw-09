import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

        if (intervalID) {
            stopTimer();
        };

        selectedDate = selectedDates[0];
        startButtonRef.disabled = false;

        updateTimer();
    },
};

const fp = flatpickr("#datetime-picker", options);

let startButtonRef = getElement("[data-start]");
startButtonRef.disabled = true;

let selectedDate = null;
let intervalID = null;

startButtonRef.addEventListener('click', startTimer);

Notify.warning("To set the detonator timer, select the detonation date and move to a safe distance. If you do not have time to move to a safe distance, just set a new date.", {messageMaxLength: 200, position: 'center-top', timeout: 30000});

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
    return value >= 0 ? String(value).padStart(2, '0') : '00';
}

function getElement(selector) {
    return document.querySelector(selector);
}

function startTimer() {
    startButtonRef.disabled = true;

    intervalID = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(intervalID);
    intervalID = null;
}

function updateTimer() {
    let { days, hours, minutes, seconds } = convertMs(selectedDate - Date.now());

    getElement('[data-days]').textContent = addLeadingZero(days);
    getElement('[data-hours]').textContent = addLeadingZero(hours);
    getElement('[data-minutes]').textContent = addLeadingZero(minutes);
    getElement('[data-seconds]').textContent = addLeadingZero(seconds);

    if (Date.now() - selectedDate > 0) {
        Notify.success("BOOM!!!");
        stopTimer();
    }
}