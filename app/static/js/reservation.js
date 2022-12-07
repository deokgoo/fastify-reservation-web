import { postData } from './_fetch.js';

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

const checkVariation = () => {
  let variation = false;
  if(!$userName.value) {
    $userName.classList.add('bg-warning');
    variation = true;
  }
  
  if(!$depart.value) {
    $depart.classList.add('bg-warning');
    variation = true;
  }

  if(!$startDate.value) {
    $startDate.classList.add('bg-warning');
    variation = true;
  }

  if(!$endDate.value) {
    $endDate.classList.add('bg-warning');
    variation = true;
  }

  if(variation) {
    alert('입력을 확인해주세요.');
    throw new Error();
  }
}

const removeClass = (e) => e.target.classList.remove('bg-warning');

$userName.addEventListener('keypress', removeClass);
$depart.addEventListener('keypress', removeClass);
$startDate.addEventListener('change', removeClass);
$endDate.addEventListener('change', removeClass);

$btnReservation.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    checkVariation();

    const deviceId = $deviceId.value;
    const url = `/api/reservation/${deviceId}`;

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
  const formatedMonth = currentDate.getMonth() + 1;
  const formatedDate = currentDate.getUTCDate();

  x.textContent = `${formatedYear} ${formatedMonth} ${formatedDate}`;
});

$$endDate.forEach(x => {
  const date = x.dataset.date;
  const currentDate = new Date(date);
  const formatedYear = currentDate.getFullYear();
  const formatedMonth = currentDate.getMonth() + 1;
  const formatedDate = currentDate.getUTCDate();

  x.textContent = `${formatedYear} ${formatedMonth} ${formatedDate}`
});

$btnHistoryBack.addEventListener('click', () => {
  location.href = '/';
});

if($statusNo) {
  $btnReservation.setAttribute('disabled', true);
};
