// Load application styles
import 'styles/index.less';

const $numberOfElements = document.querySelector('.get-number-of-elements');
const $plusBtn = document.querySelector('.plus');
const $minusBtn = document.querySelector('.minus');
const $bubbleSortBtn = document.querySelector('.bubble-btn');
const $quickSortBtn = document.querySelector('.quick-btn');
const $startBtn = document.querySelector('.start-btn');
const $firstBox = document.querySelector('.first-box');
const $pivotBox = document.querySelector('.pivot-box');
const $secondBox = document.querySelector('.second-box');

let selectedSort;
const swapedArray = [];

(function () {
  const initialElements = $numberOfElements.textContent;
  for (let i = 0; i < initialElements; i++) {
    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    $firstBox.appendChild(inputEl);
  }

})();

$plusBtn.addEventListener('click', () => {
  if ($numberOfElements.textContent < 10) {
    $numberOfElements.textContent++;
    createElements($numberOfElements.textContent);
  }
});

$minusBtn.addEventListener('click', () => {
  if ($numberOfElements.textContent > 5) {
    $numberOfElements.textContent--;
    createElements($numberOfElements.textContent);
  }
});

function createElements(numOfElements) {
  while ($firstBox.firstChild) {
    $firstBox.removeChild($firstBox.firstChild);
  }
  for (let i = 0; i < numOfElements; i++) {
    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.className = 'element';
    $firstBox.appendChild(inputEl);
  }
}

$bubbleSortBtn.addEventListener('click', (e) => {
  selectedSort = 'bubble';
  showSelectedElement(e.target);
});
$quickSortBtn.addEventListener('click', (e) => {
  selectedSort = 'quick';
  showSelectedElement(e.target);
});

function showSelectedElement(targetedElement) {
  targetedElement.style.backgroundColor = '#fd2020';
}

$startBtn.addEventListener('click', (e) => {
  const initialElementsNumber = +$numberOfElements.textContent;
  const elementsList = $firstBox.childNodes
  if (elementsList.length === initialElementsNumber) {
    for (let i = 0; i < elementsList.length; i++) {
      if (!elementsList[i].value) alert('숫자 넣어 임마!');
      break;
    }
    createNewElements(elementsList);
    $startBtn.style.visibility = 'hidden';
    if (selectedSort === 'bubble') bubbleSort($firstBox.children);
    else alert('솔트 클릭해 임마!');
  }
});

function createNewElements(inputList) {
  const len = inputList.length;
  const elementsValue = [];
  const pivotElement = document.createElement('div');

  pivotElement.className = 'pivot';
  $pivotBox.appendChild(pivotElement);

  for (let j = 0; j < len; j++) {
    elementsValue.push(inputList[j].value);
  }
  while ($firstBox.firstChild) {
    $firstBox.removeChild($firstBox.firstChild);
  }
  for (let i = 0; i < len; i++) {
    const firstLineEl = document.createElement('div');
    const secondLineEL = document.createElement('div');

    firstLineEl.className = `element${elementsValue[i]}`;
    firstLineEl.dataset.value = elementsValue[i];
    firstLineEl.textContent = elementsValue[i];
    firstLineEl.style.left = 50 * (i + 1);
    $firstBox.appendChild(firstLineEl);

    secondLineEL.dataset.id  = i;
    secondLineEL.style.left = 50 * (i + 1);
    $secondBox.appendChild(secondLineEL);
  }
}

function swapAnimation(swapedArray) {
  let time = 500;
  for (let i = 0; i < swapedArray.length; i++) {
    const changeEl1 = document.querySelector(`.element${swapedArray[i][0]}`);
    const changeEl2 = document.querySelector(`.element${swapedArray[i][1]}`);
    setTimeout(() => {
      changeEl1.style.backgroundColor = '#7b6fec';
      changeEl2.style.backgroundColor = '#7b6fec';
    }, time);
    setTimeout(() => {
      $firstBox.insertBefore(changeEl2, changeEl1)
    }, time + 500);
    setTimeout(() => {
      changeEl1.style.backgroundColor = '#45f7aa';
      changeEl2.style.backgroundColor = '#45f7aa';
    }, time + 1000);
    time += 1500;
  }
  $startBtn.style.visibility = 'visible';
}

function bubbleSort(elementNodeList) {
  const arr = [];
  for (let i = 0; i < elementNodeList.length; i++) {
    arr.push(+elementNodeList[i].dataset.value);
  }
  for (let outer = arr.length; outer >= 2; outer--) {
    for (let inner = 0; inner <= outer - 2; inner++) {
      if (+arr[inner] > +arr[inner + 1]) {
        swapedArray.push([arr[inner], arr[inner + 1]]);
        swap(arr, inner, inner + 1);
      }
    }
  }
  swapAnimation(swapedArray);
}

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

const swapedArr = [];
swapedArr.push({ type: 'start' });

function quickSort(elementNodeList) {
  if (elementNodeList.length === 0) return [];

  const arr = [];
  for (let i = 0; i < elementNodeList.length; i++) {
    arr.push(+elementNodeList[i].dataset.value);
  }

  const lesser = [];
  const greater = [];
  const [pivot, ...compareArr] = arr;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) lesser.push(arr[i]);
    if (arr[i] > pivot) greater.push(arr[i]);
  }

  const curResultArr = lesser.concat(pivot, greater);
  swapedArr.push({ type: 'select-pivot', pivot });

  for (let k = 0; k < [...compareArr].length; k++) {
    const resultIndex = curResultArr.indexOf([...compareArr][k])
    swapedArr.push({ type: 'compare', compareArr: [...compareArr][k] });
    swapedArr.push({ type: 'swap', swapArr: [[...compareArr][k], resultIndex] });
  }
  for (let j = 0; j < [...compareArr].length; j++) {
    var movedPivot = curResultArr.indexOf(pivot)
  }

  swapedArr.push({ type: 'swap', swapArr: [pivot, movedPivot] });
  swapedArr.push({ type: 'result', curResultArr: curResultArr });
  swapedArr.push({ type: 'end' });
  swapedArr.push({ type: 'start' });

  return quickSort(lesser).concat(pivot, quickSort(greater));
}