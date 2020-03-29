/* eslint no-underscore-dangle: 0 */
import axios from 'axios';

export default () => {
  const autocompleteElements = document.querySelector('#search-field');
  const list = document.querySelector('.search-results-ul');
  const div = document.querySelector('.search-results');
  autocompleteElements.addEventListener('focus', () => {
    div.classList.add('search-results-show');
  });
  autocompleteElements.addEventListener('blur', () => {
    div.classList.remove('search-results-show');
  });
  autocompleteElements.addEventListener('input', async (e) => {
    e.preventDefault();
    const input = e.target.value;
    const url = `/search?input=${input}`;
    axios.get(url).then((response) => {
      const options = response.data.length === 0 ? [{ title: 'Не найдено', _id: '-' }] : response.data;
      const listHTML = options.map((item) => `<li><a href="/catalog/${item._id}">${item.title}</a></li>`).join('\n');
      list.innerHTML = listHTML;
    });
  });
};
