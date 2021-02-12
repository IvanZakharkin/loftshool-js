/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = [];

function updateCookies() {
  if (document.cookie) {
    cookies = document.cookie.split('; ').reduce((acc, el) => {
      const [name, value] = el.split('=');

      acc.push({ name, value });

      return acc;
    }, []);
  } else {
    cookies = [];
  }

  filterCookies(filterNameInput.value);
}

function createCookie() {
  if (!addNameInput.value) return;

  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  // addNameInput.value = '';
  // addValueInput.value = '';

  updateCookies();
}

function filterCookies(value) {
  const filterCookies = cookies.filter((el) => {
    return el.name.includes(value) || el.value.includes(value);
  });

  renderCookies(filterCookies);
}

function removeCookie({ name, value }) {
  document.cookie = `${name}=${value};expires=01 Jan 1970 00:00:00 GMT`;
  updateCookies();
}

function renderCookies(cookies) {
  listTable.innerHTML = '';
  const fragment = document.createDocumentFragment();

  cookies.forEach((cookie) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdBtn = document.createElement('td');
    const btn = document.createElement('button');
    const handlerBtnRemoveCookie = () => {
      removeCookie(cookie);
    };

    tdName.textContent = cookie.name;
    tdValue.textContent = cookie.value;
    btn.textContent = 'удалить';

    btn.addEventListener('click', handlerBtnRemoveCookie);

    tr.append(tdName);
    tr.append(tdValue);
    tr.append(tdBtn);
    tdBtn.append(btn);
    fragment.append(tr);
  });

  listTable.append(fragment);
}

function handlerFilterNameInput(e) {
  filterCookies(e.target.value);
}

function handlerAddButton() {
  createCookie();
}
// function handlerAddButton () {
//   createCookie();
// }

filterNameInput.addEventListener('input', handlerFilterNameInput);

addButton.addEventListener('click', handlerAddButton);

// updateCookies();
// listTable.addEventListener('click', (e) => {});
