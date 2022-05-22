import { deleteData } from './_fetch';

const $editArr = document.querySelectorAll('.js-edit');
const $deleteArr = document.querySelectorAll('.js-delete');

$editArr.forEach(x => {
  x.addEventListener('click', async () => {
    const editId = x.querySelector('.js-edit__id').textContent.replaceAll(' ', '');
  
    location.href = `/device/edit/${editId}`;
  })
});

$deleteArr.forEach(x => {
  x.addEventListener('click', async () => {
    const deleteId = x.querySelector('.js-delete__id').textContent.replaceAll(' ', '');
    const url = `/api/device/${deleteId}`;
  
    try {
      await deleteData(url);
      location.reload();
    } catch {
      alert('unexpected error');
    }
  });
});
