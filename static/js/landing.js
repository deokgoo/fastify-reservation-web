const BTN_INACTIVE = 'btn-light';
const BTN_ACTIVE = 'btn-success';

const $fitlerAll = document.querySelector('.js-filter-all');
const $fitlerAOS = document.querySelector('.js-filter-aos');
const $fitlerIOS = document.querySelector('.js-filter-ios');
const $$date = document.querySelectorAll('.js-date');
const $$btnReservation = document.querySelectorAll('.js-reservation');

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const activeClass = ($el) => {
  $el.classList.add(BTN_ACTIVE);
  $el.classList.remove(BTN_INACTIVE);
  $el.classList.add('active');
}

const inActiveClass = ($el) => {
  $el.classList.add(BTN_INACTIVE);
  $el.classList.remove(BTN_ACTIVE);
  $el.classList.remove('active');
}

// filter 구분
if(params.os === 'aos') {
  activeClass($fitlerAOS);
  inActiveClass($fitlerIOS);
  inActiveClass($fitlerAll);
} else if(params.os === 'ios') {
  activeClass($fitlerIOS);
  inActiveClass($fitlerAOS);
  inActiveClass($fitlerAll);
} else {
  activeClass($fitlerAll);
  inActiveClass($fitlerAOS);
  inActiveClass($fitlerIOS);
}

$$btnReservation.forEach(x => {
  x.addEventListener('click', () => {
    const id = x.dataset.id;
    location.href = `/reservation/${id}`;
  });
})

$$date.forEach(x => {
  const formattedDate = (date) => {
    const currentDate = new Date(date);
    const formatedYear = currentDate.getFullYear();
    const formatedMonth = currentDate.getMonth();
    const formatedDate = currentDate.getDate();

    return `${formatedYear}.${formatedMonth}.${formatedDate}`;
  }
  
  x.textContent = `(${formattedDate(x.dataset.start)} ~ ${formattedDate(x.dataset.end)})`
})
