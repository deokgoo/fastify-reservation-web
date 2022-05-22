import { postData } from './_fetch';

const $btnAdd = document.querySelector('.js-add');
const $chooseFile = document.querySelector('#chooseFile');
const $show = document.querySelector('.js-show');

$btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  const $name = document.querySelector('#formControlInputName');
  const $os = document.querySelector('#formControlInputOS');
  const $os_version = document.querySelector('#formControlInputOSVersion');

  try {
    postData('/api/device', {
      name: $name.value,
      os: $os.value,
      os_version: $os_version.value,
      img_url: $show.src,
    })
    alert('register success');
    location.reload();
  }catch {
    console.warn('unexpected error');
  }
});

$chooseFile.addEventListener('change', () => {
  const file = $chooseFile.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const result = evt.target.result.replace(/\n/g,'<br />');

    $show.src = result;
  };

  reader.readAsDataURL(file, 'UTF-8');
});
