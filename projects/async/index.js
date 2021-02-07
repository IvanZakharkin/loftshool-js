/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';
import { loadAndSortTowns as loadTowns } from './functions';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const state = {
  towns: [],
  blocks: {
    loadingBlock,
    loadingFailedBlock,
    filterBlock,
  },
};

function showBlock(block) {
  for (const nameBlock in state.blocks) {
    if (nameBlock === block) {
      state.blocks[nameBlock].style.display = 'block';
    } else {
      state.blocks[nameBlock].style.display = 'none';
    }
  }
}

function updateTowns(data) {
  state.towns = data;
}

function filterTownsByValue(value) {
  let filteredTowns = [];

  if (value) {
    filteredTowns = state.towns.filter((town) => isMatching(town.name, value));
  }

  renderTowns(filteredTowns);
}

function renderTowns(towns) {
  filterResult.innerHTML = '';

  towns.forEach((town) => {
    const li = document.createElement('div');
    li.textContent = town.name;
    filterResult.append(li);
  });
}

function tryLoadTowns() {
  showBlock('loadingBlock');
  loadTowns()
    .then((towns) => {
      updateTowns(towns);
      filterTownsByValue();
      showBlock('filterBlock');
    })
    .catch(() => showBlock('loadingFailedBlock'));
}

const handleRetryButtonClick = () => {
  tryLoadTowns();
};
const handleFilterInput = (e) => {
  filterTownsByValue(e.target.value);
};

retryButton.addEventListener('click', handleRetryButtonClick);

filterInput.addEventListener('input', handleFilterInput);

tryLoadTowns();

export { loadTowns, isMatching };
