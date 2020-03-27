export default () => {
  const pagenumber = document.querySelector('#pagenumber');
  if (!pagenumber) {
    return;
  }
  const first = document.getElementById('firstpage');
  if (!first) {
    return;
  }
  first.addEventListener('click', (event) => {
    event.preventDefault();
    pagenumber.value = 1;
    document.forms.catalogform.submit();
  });
  const second = document.getElementById('secondpage');
  if (!second) {
    return;
  }
  second.addEventListener('click', (event) => {
    event.preventDefault();
    pagenumber.value = 2;
    document.forms.catalogform.submit();
  });
  const next = document.getElementById('nextpage');
  console.log(next);
  if (!next) {
    return;
  }
  next.addEventListener('click', (event) => {
    event.preventDefault();
    const value = Number(pagenumber.value);
    pagenumber.value = value + 1;
    document.forms.catalogform.submit();
  });
  const third = document.getElementById('thirdpage');
  if (!third) {
    return;
  }
  third.addEventListener('click', (event) => {
    event.preventDefault();
    pagenumber.value = 3;
    document.forms.catalogform.submit();
  });
};
