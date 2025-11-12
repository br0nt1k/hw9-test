// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector("[data-start]"),
    clockface: document.querySelector(".timer"),
    daysSpan: document.querySelector("[data-days]"),
    hoursSpan: document.querySelector("[data-hours]"),
    minutesSpan: document.querySelector("[data-minutes]"),
    secondsSpan: document.querySelector("[data-seconds]"),
}

let intervalId;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates[0];
        if (userSelectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        }
  },
};

flatpickr("#datetime-picker", options);

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
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
    if (intervalId) return;
    if (!userSelectedDate) return; 
    refs.startBtn.disabled = true;
    

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const str = convertMs(diff);
    
    const { days, hours, minutes, seconds } = str;
      
    refs.daysSpan.textContent = addLeadingZero(days);
    refs.hoursSpan.textContent = addLeadingZero(hours);
    refs.minutesSpan.textContent = addLeadingZero(minutes);
    refs.secondsSpan.textContent = addLeadingZero(seconds);

    if (diff < 1000) {
      clearInterval(intervalId);
      }
      
  }, 1000);
});

