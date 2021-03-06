import { postData, deleteData } from './_fetch.js';

const $chooseFile = document.querySelector('#chooseFile');
const $img = document.querySelector('.js-img');
const $btnUpdate = document.querySelector('.js-update');
const $btnDelete = document.querySelector('.js-delete');
const $btnBack = document.querySelector('.js-hBack');

const $formControlInputId = document.querySelector('#formControlInputId');
const $formControlInputNo = document.querySelector('#formControlInputNo');
const $formControlInputName = document.querySelector('#formControlInputName');
const $formControlInputOS = document.querySelector('#formControlInputOS');
const $formControlInputOSVersion = document.querySelector('#formControlInputOSVersion');

$btnBack.addEventListener('click', () => {
  location.href = '/device/edit';
})

$chooseFile.addEventListener('change', () => {
  const file = $chooseFile.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const result = evt.target.result.replace(/\n/g,'<br />');
    console.log(result);
    $img.src = result;
  };

  reader.readAsDataURL(file, 'UTF-8');
});

$btnUpdate.addEventListener('click', async () => {
  const id = $formControlInputId.value;
  const no = $formControlInputNo.value;
  const name = $formControlInputName.value;
  const os = $formControlInputOS.value;
  const os_version = $formControlInputOSVersion.value;
  const img_url = $img.src;

  const url = `/api/device/${id}`;

  try {
    await postData(url, {
      no,
      name,
      os,
      os_version,
      img_url
    });
    
    location.reload();
  } catch {
    console.warn('unexpected error')
  }
})

$btnDelete.addEventListener('click', async () => {
  const id = $formControlInputId.value;
  const url = `/api/device/${id}`;

  try {
    await deleteData(url);
    location.href = '/device/edit';
  } catch {
    alert('unexpected error');
  }
})

