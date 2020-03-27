export default () => {
  const sortfield = document.querySelector('#sort');
  if (!sortfield) {
    return;
  }
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');

  const sortPrice = document.querySelector('#sortprice');

  sortPrice.addEventListener('click', async (e) => {
    e.preventDefault();
    const sortRemove = document.querySelector('.sort-item-active');
    if (sortRemove) {
      sortRemove.classList.remove('sort-item-active');
    }
    sortPrice.classList.add('sort-item-active');
    sortfield.value = 'discountPrice';
    down.classList.remove('sort-down-active');
    if (!up.classList.contains('sort-up-active')) {
      up.classList.add('sort-up-active');
    }
  });
  const sortPopularity = document.querySelector('#sortpopularity');
  sortPopularity.addEventListener('click', async (e) => {
    e.preventDefault();
    const sortRemove = document.querySelector('.sort-item-active');
    if (sortRemove) {
      sortRemove.classList.remove('sort-item-active');
    }
    sortPopularity.classList.add('sort-item-active');
    sortfield.value = 'totalBoughts';
    down.classList.remove('sort-down-active');
    if (!up.classList.contains('sort-up-active')) {
      up.classList.add('sort-up-active');
    }
  });
  const sortType = document.querySelector('#sorttype');
  sortType.addEventListener('click', async (e) => {
    e.preventDefault();
    const sortRemove = document.querySelector('.sort-item-active');
    if (sortRemove) {
      sortRemove.classList.remove('sort-item-active');
    }
    sortType.classList.add('sort-item-active');
    sortfield.value = 'title';
    down.classList.remove('sort-down-active');
    if (!up.classList.contains('sort-up-active')) {
      up.classList.add('sort-up-active');
    }
  });
  up.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!up.classList.contains('sort-up-active')) {
      up.classList.add('sort-up-active');
    }
    down.classList.remove('sort-down-active');
    const { value } = sortfield;
    if (value.startsWith('-')) {
      sortfield.value = `${value.slice(1)}`;
    }
  });
  down.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!down.classList.contains('sort-down-active')) {
      down.classList.add('sort-down-active');
    }
    up.classList.remove('sort-up-active');
    const { value } = sortfield;
    if (!value.startsWith('-')) {
      sortfield.value = `-${value}`;
    }
  });
};
