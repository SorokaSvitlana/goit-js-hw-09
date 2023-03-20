function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const NOTIFICATION_DELAY = 1000;
let timer = null;

  const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

refs.start.addEventListener('click', onStartClick)
refs.stop.addEventListener('click', onStopClick);

onDisableBtn(refs.stop)


function onStartClick() {
   timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();  
    }, NOTIFICATION_DELAY);

    onDisableBtn(refs.start)
    refs.stop.removeAttribute('disabled');
}

function onStopClick() {
    clearInterval(timer);
    refs.start.removeAttribute('disabled');
  onDisableBtn(refs.stop)
}

function onDisableBtn(button) {
    button.setAttribute('disabled', 'disabled');
  }
