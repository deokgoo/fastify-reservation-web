const deleteData = (url) => {
  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  });
}

const $deleteArr = document.querySelectorAll('.js-delete');

$deleteArr.forEach(x => {
  x.addEventListener('click', async () => {
    const deleteId = x.querySelector('.js-delete__id').textContent.replaceAll(' ', '');
    console.log(deleteId)
    const url = `/api/device/${deleteId}`;
  
    try {
      await deleteData(url);
      location.reload();
    } catch {
      alert('unexpected error')
    }
  })
})