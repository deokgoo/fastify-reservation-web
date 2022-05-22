import { postData } from './_fetch';

const $btnReservation = document.querySelector('.js-reservation');
const $btnHistoryBack = document.querySelector('.js-hBack');
const $deviceId = document.querySelector('#formControlInputId');
const $userName = document.querySelector('#formControlInputUserName');
const $depart = document.querySelector('#formControlInputDepart');
const $startDate = document.querySelector('#formControlInputStartDate');
const $endDate = document.querySelector('#formControlInputEndDate');
const $statusNo = document.querySelector('.js-status-no');

const $$startDate = document.querySelectorAll('.start-date');
const $$endDate = document.querySelectorAll('.end-date');

$btnReservation.addEventListener('click', async (e) => {
  e.preventDefault();

  const deviceId = $deviceId.value;
  const url = `/api/reservation/${deviceId}`;
  try {
    await postData(url, {
      name: $userName.value,
      department: $depart.value,
      startDate: $startDate.value,
      endDate: $endDate.value,
    })
    location.reload();
  } catch {
    console.warn('unexpected error');
  }
})

$$startDate.forEach(x => {
  const date = x.dataset.date;
  const currentDate = new Date(date);
  const formatedYear = currentDate.getFullYear();
  const formatedMonth = currentDate.getMonth();
  const formatedDate = currentDate.getDate();
  x.textContent = `${formatedYear} ${formatedMonth} ${formatedDate}`
})

$$endDate.forEach(x => {
  const date = x.dataset.date;
  const currentDate = new Date(date);
  const formatedYear = currentDate.getFullYear();
  const formatedMonth = currentDate.getMonth();
  const formatedDate = currentDate.getDate();
  x.textContent = `${formatedYear} ${formatedMonth} ${formatedDate}`
})

$btnHistoryBack.addEventListener('click', () => {
  location.href = '/';
})

if($statusNo) {
  $btnReservation.setAttribute('disabled', true);
}
