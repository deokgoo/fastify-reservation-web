const $$startDate = document.querySelectorAll('.start-date');
const $$endDate = document.querySelectorAll('.end-date');
const $$btnReturn = document.querySelectorAll('.js-return');

const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer',
  });
}

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

$$btnReturn.forEach(x => {
  x.addEventListener('click', async (e) => {
    e.preventDefault();
    const reservationId = x.dataset.reservationId;
    const url = `/api/reservation/return/${reservationId}`;

    try{
      await postData(url);
    } catch {
      console.warn('error')
    }

    location.reload();
    
  })
})
