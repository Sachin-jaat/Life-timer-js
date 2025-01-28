let isDOBOpen = false;
let dateOfBirth;

const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBButtonEl = document.getElementById("afterDOBButton");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");
const yearEl = document.getElementById("year");
const monthEl = document.getElementById("Months");
const daysEl = document.getElementById("Days");
const hoursEl = document.getElementById("hour");
const minutesEl = document.getElementById("minutes");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => (number > 9 ? number : `0${number}`);

const toggleDateOfBirthSelector = () => {
  settingContentEl.classList.toggle("hide");
  isDOBOpen = !isDOBOpen;
  console.log("Toggle State:", isDOBOpen);
};

const updateAge = () => {
  if (!dateOfBirth) return;

  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;

  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30)) % 12);
  const days = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30);
  const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((dateDiff / (1000 * 60)) % 60);
  const second = Math.floor((dateDiff / 1000) % 60);

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  daysEl.innerHTML = makeTwoDigitNumber(days);
  hoursEl.innerHTML = makeTwoDigitNumber(hour);
  minutesEl.innerHTML = makeTwoDigitNumber(minutes);
  secondEl.innerHTML = makeTwoDigitNumber(second);
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;
  dateOfBirth = dateString ? new Date(dateString) : null;

  if (!dateOfBirth) {
    afterDOBButtonEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
    return;
  }

  // Store date values in localStorage
  localStorage.setItem("year", dateOfBirth.getFullYear());
  localStorage.setItem("month", dateOfBirth.getMonth());
  localStorage.setItem("day", dateOfBirth.getDate());
  localStorage.setItem("hour", dateOfBirth.getHours());
  localStorage.setItem("minutes", dateOfBirth.getMinutes());
  localStorage.setItem("second", dateOfBirth.getSeconds());

  initialTextEl.classList.add("hide");
  afterDOBButtonEl.classList.remove("hide");

  updateAge();
  setInterval(updateAge, 1000);
};

// Load saved DOB if available
const loadSavedDOB = () => {
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const day = localStorage.getItem("day");
  const hour = localStorage.getItem("hour");
  const minutes = localStorage.getItem("minutes");
  const second = localStorage.getItem("second");

  if (year && month && day) {
    dateOfBirth = new Date(year, month, day, hour, minutes, second);
    updateAge();
    setInterval(updateAge, 1000);
    initialTextEl.classList.add("hide");
    afterDOBButtonEl.classList.remove("hide");
  }
};

loadSavedDOB();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
