const postData = (url, data) => {
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

const $form = document.querySelector('#device-info-form');
const $chooseFile = document.querySelector('#chooseFile');
const $img_url = document.querySelector('[name=img_url]');

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const $name = document.querySelector('[name=name]');
  const $os = document.querySelector('[name=os]');
  const $os_version = document.querySelector('[name=os_version]');

  try {
    postData('/api/device', {
      name: $name.value,
      os: $os.value,
      os_version: $os_version.value,
      img_url: $img_url.value,
    })
  }catch {
    console.warn('unexpected error');
  }
});

$chooseFile.addEventListener('change', () => {
  const file = $chooseFile.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    $img_url.value = evt.target.result;
  };
  reader.readAsText(file);
});

