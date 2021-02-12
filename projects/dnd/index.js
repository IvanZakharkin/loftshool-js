/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');
const extremeDivСoordinates = {
  maxLeft: document.documentElement.clientWidth,
  maxBottom: document.documentElement.clientHeight,
  minLeft: addDivButton.getBoundingClientRect().right,
  minTop: addDivButton.getBoundingClientRect().bottom,
};

function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomColorRGB() {
  const r = getRandomInteger(0, 255);
  const g = getRandomInteger(0, 255);
  const b = getRandomInteger(0, 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function moveDivAt(e, div) {
  div.style.left = e.pageX - div.offsetWidth / 2 + 'px';
  div.style.top = e.pageY - div.offsetHeight / 2 + 'px';
}

function getCoordinatesDiv(width, height) {
  return {
    top: getRandomInteger(
      extremeDivСoordinates.minTop,
      extremeDivСoordinates.maxBottom - height
    ),
    left: getRandomInteger(
      extremeDivСoordinates.minLeft,
      extremeDivСoordinates.maxLeft - width
    ),
  };
}

export function createDiv() {
  const div = document.createElement('div');
  const height = getRandomInteger(20, 400);
  const width = getRandomInteger(20, 400);
  const { top, left } = getCoordinatesDiv(width, height);
  const dragStart = () => {
    div.dataset.draggable = 'enable';
    div.style.zIndex = 100;
  };
  const dragEnd = () => {
    div.dataset.draggable = 'disable';
    div.style.zIndex = 10;
  };

  div.classList.add('draggable-div');
  div.style.top = top + 'px';
  div.style.left = left + 'px';
  div.style.height = height + 'px';
  div.style.width = width + 'px';
  div.style.background = getRandomColorRGB();
  div.dataset.draggable = 'disable';
  div.setAttribute('draggable', 'false');

  div.addEventListener('mousedown', dragStart);
  document.addEventListener('mouseup', dragEnd);

  return div;
}

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

document.addEventListener('mousemove', (e) => {
  const div = document.querySelector('[data-draggable="enable"]');

  if (!div) return;

  moveDivAt(e, div);
});
