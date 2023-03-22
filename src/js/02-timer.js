import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('[id="datetime-picker"]'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMins: document.querySelector('[data-minutes]'),
  timerSec: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDates]) {
        if (selectedDates < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.startBtn.disabled = true;
        } else {
          refs.startBtn.disabled = false;
        }
    },
};

flatpickr(refs.inputDate, options);


refs.startBtn.addEventListener('click', onStartTimer)

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
    return value.toString().padStart(2, '0');
}



function onStartTimer() {
    let timer = setInterval(() => {
        let checkedDate = new Date(refs.inputDate.value) - Date.now();
        refs.startBtn.disabled = true;
        if (checkedDate >= 0) {
            let timeObject = convertMs(checkedDate);
            setTimerValues(refs, timeObject)
        } else {
            clearInterval(timer);
        }
    }, 1000); }

    function setTimerValues(refs, timeObject) {
        refs.timerDays.textContent = addLeadingZero(timeObject.days);
        refs.timerHours.textContent = addLeadingZero(timeObject.hours);
        refs.timerMins.textContent = addLeadingZero(timeObject.minutes);
        refs.timerSec.textContent = addLeadingZero(timeObject.seconds);
      }
      