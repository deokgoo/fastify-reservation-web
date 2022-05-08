const $loginForm = document.querySelector('#login-form');

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
  location.replace('/admin');
});