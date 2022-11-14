let startButtonRef = getElement('[data-start]');
let intervalID = null;

setClickListener('[data-start]', startInterval);
setClickListener('[data-stop]', stopInterval);

function getElement(selector) {
    return document.querySelector(selector);
}

function setClickListener(selector, intervalFunction) {
    return getElement(selector).addEventListener("click", intervalFunction);
}

function changeButtonDisabled() {
    startButtonRef.disabled = !startButtonRef.disabled;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBackgroundColor() {
    getElement('body').style.backgroundColor = getRandomHexColor();
}

function startInterval() {
    changeButtonDisabled();

    intervalID = setInterval(setBackgroundColor, 1000);
}

function stopInterval() {
    if (!startButtonRef.disabled) {
        return;
    };

    changeButtonDisabled();

    clearInterval(intervalID);
}