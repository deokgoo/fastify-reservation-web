import { postData } from './_fetch.js';

const $submitBtn = document.querySelector('#submit');
const fieldList = {
  $name: document.querySelector('#name'),
  $department: document.querySelector('#department'),
  $email: document.querySelector('#email'),
  $password: document.querySelector('#password'),
}

const varidationField = ($el) => {
  if ($el?.value) {
    return true
  } else {
    $el.classList.add('bg-warning');
    return false;
  }
}

$submitBtn.addEventListener('click', () => {
  const fieldKeys = Object.keys(fieldList);
  const insertedField = fieldKeys.filter((x) => varidationField(fieldList[x]));

  if(insertedField.length !== fieldKeys.length) {
    alert('please check your insert');
  }

  try {
    postData('/api/auth/register', {
      name: fieldList.$name.value,
      department: fieldList.$department.value,
      email: fieldList.$email.value,
      password: fieldList.$password.value,
    })
    alert('register success');
    location.href = '/login'
  }catch {
    console.warn('unexpected error');
  }
})

Object.keys(fieldList).forEach(x => {
  fieldList[x].addEventListener('keypress', (e) => {
    e.target.classList.remove('bg-warning');
  })
})
