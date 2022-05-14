const $btnReservation = document.querySelector('.js-reservation');
const $deviceId = document.querySelector('#formControlInputId');
const $userName = document.querySelector('#formControlInputUserName');
const $depart = document.querySelector('#formControlInputDepart');
const $startDate = document.querySelector('#formControlInputStartDate');
const $endDate = document.querySelector('#formControlInputEndDate');

const postData = (url, data) => {
  console.log(url, data);
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  });
}

$btnReservation.addEventListener('click', (e) => {
  e.preventDefault();

  const deviceId = $deviceId.value;
  const url = `/api/reservation/${deviceId}`;
  postData(url, {
    name: $userName.value,
    department: $depart.value,
    startDate: $startDate.value,
    endDate: $endDate.value,
  })
})
