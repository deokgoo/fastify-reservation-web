const $loginForm = document.querySelector('#login-form');

const cookies = document.cookie.split(';');
const accessToken = cookies.find(x => x.replace(' ', '').startsWith('accessToken'));
if(accessToken) {
  if(accessToken.split('=')[1]) {
    location.replace('/device/return');
  }
}

$loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData($loginForm);
  const insertedId = formData.get('id');
  const insertedPw = formData.get('pw');

  const encryptedAuth = btoa(`${insertedId}:${insertedPw}`);

  const token = await fetch('/api/auth/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Authorization': `Basic ${encryptedAuth}`,
    },
    body: {},
    referrer: 'no-referrer',
  }).then(res => res.text());

  document.cookie = `accessToken=${token}`;
  location.replace('/device/return');
});